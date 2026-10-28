import os
import requests
from decimal import Decimal
from bs4 import BeautifulSoup
from django.core.management.base import BaseCommand
from django.core.files.base import ContentFile
from django.contrib.auth import get_user_model
from django.utils.text import slugify

from apps.categories.models import Category
from apps.posts.models import Post

User = get_user_model()

DEFAULT_CATEGORIES = {
    'smartfoniy': 'Смартфоны',
    'noutbuki': 'Ноутбуки',
    'naushniki': 'Наушники',
    'planshetiy': 'Планшеты',
    'smart_chasiy': 'Смарт-часы',
}


class Command(BaseCommand):
    help = 'Парсинг каталога Sulpak.kg и наполнение маркетплейса товарами'

    def add_arguments(self, parser):
        parser.add_argument(
            '--category',
            type=str,
            default='all',
            help='Slug категории на Sulpak (например smartfoniy) или "all"'
        )
        parser.add_argument(
            '--limit',
            type=int,
            default=10,
            help='Максимальное количество товаров на категорию (по умолчанию 10)'
        )
        parser.add_argument(
            '--no-images',
            action='store_true',
            help='Не скачивать файлы изображений'
        )

    def handle(self, *args, **options):
        target_cat = options['category']
        limit = options['limit']
        download_images = not options['no_images']

        # 1. Обеспечиваем наличие пользователя магазина
        store_user, created_user = User.objects.get_or_create(
            username='sulpak_store',
            defaults={
                'first_name': 'Sulpak',
                'last_name': 'Official',
                'is_staff': True,
            }
        )
        if created_user:
            store_user.set_password('Sulpak12345!')
            store_user.save()
            self.stdout.write(self.style.SUCCESS('Создан продавец sulpak_store'))

        # Определение категорий для парсинга
        if target_cat == 'all':
            cats_to_parse = DEFAULT_CATEGORIES
        else:
            cats_to_parse = {target_cat: DEFAULT_CATEGORIES.get(target_cat, target_cat.capitalize())}

        session = requests.Session()
        session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept-Language': 'ru-RU,ru;q=0.9,en;q=0.8',
        })

        total_created = 0
        total_updated = 0

        for slug, title in cats_to_parse.items():
            category, _ = Category.objects.get_or_create(
                slug=slug,
                defaults={'title': title}
            )
            self.stdout.write(self.style.MIGRATE_HEADING(f'\nПарсинг категории: {title} ({slug})...'))

            url = f'https://www.sulpak.kg/f/{slug}'
            try:
                resp = session.get(url, timeout=15)
                if resp.status_code != 200:
                    self.stdout.write(self.style.WARNING(f'Ошибка {resp.status_code} при запросе {url}'))
                    continue
            except Exception as e:
                self.stdout.write(self.style.ERROR(f'Сетевая ошибка: {e}'))
                continue

            soup = BeautifulSoup(resp.text, 'html.parser')
            cards = soup.select('div.product__item')
            self.stdout.write(f'Найдено карточек товаров на странице: {len(cards)}')

            cat_count = 0
            for card in cards:
                if cat_count >= limit:
                    break

                name = card.get('data-name')
                code = card.get('data-code')
                price_raw = card.get('data-price')
                brand = card.get('data-brand') or ''

                if not name or not price_raw:
                    continue

                try:
                    price = Decimal(str(price_raw).replace(' ', '').replace(',', '.'))
                except Exception:
                    price = Decimal('0.00')

                # Описание и характеристики
                desc_el = card.select_one('.product__item-description')
                specs = desc_el.get_text(separator=' ', strip=True) if desc_el else ''
                description = f"Бренд: {brand}\nАртикул: {code}\n{specs}".strip()

                # Извлечение URL фотографии
                img_url = None
                img_tag = card.select_one('img')
                if img_tag:
                    img_url = img_tag.get('data-src') or img_tag.get('src')
                if not img_url:
                    source_tag = card.select_one('picture source')
                    if source_tag:
                        srcset = source_tag.get('srcset', '')
                        img_url = srcset.split(',')[0].strip().split(' ')[0] if srcset else None

                if img_url and img_url.startswith('//'):
                    img_url = 'https:' + img_url

                # Создаем или обновляем объявление
                lookup_kwargs = {'external_code': code} if code else {'title': name}
                post, created = Post.objects.get_or_create(
                    **lookup_kwargs,
                    defaults={
                        'title': name,
                        'price': price,
                        'description': description,
                        'category': category,
                        'user': store_user,
                        'is_active': True,
                    }
                )

                if not created:
                    post.title = name
                    post.price = price
                    post.description = description
                    post.category = category
                    post.user = store_user
                    post.is_active = True

                # Скачивание изображения
                if download_images and img_url and (created or not post.image):
                    try:
                        img_resp = session.get(img_url, timeout=10)
                        if img_resp.status_code == 200:
                            ext = 'webp'
                            if '.jpg' in img_url.lower():
                                ext = 'jpg'
                            elif '.png' in img_url.lower():
                                ext = 'png'
                            file_name = f"sulpak_{code or slugify(name)[:20]}.{ext}"
                            post.image.save(file_name, ContentFile(img_resp.content), save=False)
                    except Exception as img_err:
                        self.stdout.write(self.style.WARNING(f'Не удалось скачать фото для {name}: {img_err}'))

                post.save()

                if created:
                    total_created += 1
                    status_text = 'Создан'
                else:
                    total_updated += 1
                    status_text = 'Обновлен'

                self.stdout.write(f'  [{status_text}] {name[:50]}... — {price} сом')
                cat_count += 1

        self.stdout.write(self.style.SUCCESS(
            f'\nГотово! Добавлено новых товаров: {total_created}, обновлено: {total_updated}'
        ))
