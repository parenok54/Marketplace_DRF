# Marketplace DRF (Sulpak Edition)

<div align="center">

![Marketplace Banner](https://img.shields.io/badge/Django-4.2.7-092E20?style=for-the-badge&logo=django&logoColor=white)
![DRF](https://img.shields.io/badge/Django_REST-Framework-red?style=for-the-badge&logo=django&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)

**Полнофункциональный маркетплейс электроники и цифровой техники с парсером Sulpak.kg, REST API на Django, современным React SPA интерфейсом и поддержкой светлой/тёмной темы.**

</div>

---

## 🌟 Основные возможности

### 🛒 Бэкенд (Django REST Framework)
- **Каталог товаров (`Post`)**:
  - Цены, категории, характеристики, артикулы, изображения и статус активности.
  - Поиск по названию и описанию (`?search=...`).
  - Фильтрация по категориям (`?category_slug=...`) и ценовому диапазону (`?min_price=...&max_price=...`).
  - Сортировка по цене и дате (`?ordering=price` / `?ordering=-price`).
  - Пагинация (12 товаров на страницу).
- **Категории (`Category`)**: Смартфоны, Ноутбуки, Наушники, Планшеты, Смарт-часы.
- **Аутентификация и безопасность**:
  - Кастомная модель пользователя с аватаром.
  - JWT-токены (`access` и `refresh` через SimpleJWT).
  - Разграничение прав доступа (создание объявлений только для авторизованных, удаление/редактирование только автором).
- **Документация API**:
  - Интерактивный Swagger UI: `/swagger/`
  - ReDoc: `/redoc/`
- **CORS**: Настроен `django-cors-headers` для работы с фронтендом.

### 🕷️ Парсер Sulpak.kg
Django Management-команда для автоматического наполнения базы реальными товарами с сайта Sulpak:
```bash
python manage.py load_sulpak --category all --limit 10
```
- Извлекает названия, актуальные цены в сомах, артикулы, подробные технические характеристики.
- Скачивает оригинальные фото товаров в `media/post_images/`.
- Автоматически создает системного продавца `sulpak_store` и категории.
- Исключает дублирование благодаря проверке артикулов (`external_code`).

### 💻 Фронтенд (React 18 + Tailwind CSS + Lucide Icons)
- **Темизация**: Светлая и Тёмная тема с переключателем (Sun / Moon) и сохранением в `localStorage`.
- **Промо-слайдер (Hero Banner)**: Анимированные баннеры акций с переходом в категории.
- **Бейджи доверия**: Рассрочка 0-0-12, экспресс-доставка, гарантия 1 год.
- **Фильтрация**:
  - Быстрый выбор брендов (Apple, Samsung, Lenovo, Asus, Acer, ARG).
  - Горизонтальные чипсы категорий с иконками.
  - Ползунки диапазона цен и сброс фильтров.
- **Карточки товаров**:
  - Расчёт ежемесячного платежа рассрочки (`от X сом/мес × 12`).
  - Звёздный рейтинг и количество отзывов.
  - Быстрая покупка **«В 1 клик»** и добавление **«В корзину»**.
  - Интерактивное избранное (Wishlist).
- **Корзина (Cart Drawer)**:
  - Выдвижное боковое меню с управлением количеством (+/-), удалением и подсчетом суммы.
  - Сохранение состояния корзины в `localStorage`.
- **Модальные окна**:
  - Детали товара с калькулятором рассрочки (3, 6, 12 мес).
  - Экспресс-заказ в 1 клик по номеру телефона.
  - Вход и регистрация по JWT.
  - Публикация нового объявления с загрузкой фото.
- **Всплывающие уведомления (Toast)** при добавлении в корзину/избранное.

---

## 🚀 Быстрый старт

### 1. Клонирование и настройка виртуального окружения
```bash
git clone https://github.com/parenok54/Marketplace_DRF.git
cd Marketplace_DRF

# Создание и активация venv
python -m venv .venv
.\.venv\Scripts\Activate.ps1    # Для Windows PowerShell
# source .venv/bin/activate      # Для Linux/macOS

# Установка зависимостей
pip install -r requirements.txt
```

### 2. Применение миграций и наполнение базы
```bash
python manage.py migrate

# Загрузка товаров из Sulpak (по 5 штук из каждой категории)
python manage.py load_sulpak --category all --limit 5

# Создание суперпользователя для админки
python manage.py createsuperuser
```

### 3. Запуск проекта

#### Вариант A: Запуск через Django (Бэкенд + собранный Фронтенд)
Django автоматически отдает собранное React-приложение:
```bash
python manage.py runserver
```
Откройте в браузере: **http://127.0.0.1:8000/**

#### Вариант B: Разработка фронтенда с Hot Reload (Vite Dev Server)
```bash
cd frontend
npm install
npm run dev
```
Фронтенд будет доступен на: **http://localhost:5173/**

---

## 📌 Полезные ссылки
- **Главная страница магазина**: `http://127.0.0.1:8000/`
- **Swagger документация**: `http://127.0.0.1:8000/swagger/`
- **ReDoc**: `http://127.0.0.1:8000/redoc/`
- **Панель администратора**: `http://127.0.0.1:8000/admin/`
- **REST API товаров**: `http://127.0.0.1:8000/api/posts/`
- **REST API категорий**: `http://127.0.0.1:8000/api/categories/`
