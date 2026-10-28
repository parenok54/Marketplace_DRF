from django.db import models
from django.contrib.auth import get_user_model

from apps.categories.models import Category

User = get_user_model()


class Post(models.Model):
    category = models.ForeignKey(
        Category, on_delete=models.SET_NULL,
        related_name="category_posts",
        blank=True, null=True,
        verbose_name="Категория"
    )
    user = models.ForeignKey(
        User, on_delete=models.SET_NULL,
        related_name="users_posts",
        blank=True, null=True,
        verbose_name="Пользователь"
    )
    title = models.CharField(
        max_length=255,
        verbose_name="Название"
    )
    price = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0.00,
        verbose_name="Цена"
    )
    description = models.TextField(
        blank=True,
        null=True,
        verbose_name="Описание"
    )
    image = models.ImageField(
        upload_to="post_images/",
        blank=True,
        null=True,
        verbose_name="Фотография"
    )
    external_code = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        unique=True,
        verbose_name="Артикул / Внешний код"
    )
    is_active = models.BooleanField(
        default=True,
        verbose_name="Активно"
    )
    created = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Дата создания"
    )

    def __str__(self):
        return f"{self.title} - {self.price} сом"

    class Meta:
        verbose_name = "Объявление"
        verbose_name_plural = "Объявления"
        ordering = ('-created',)
