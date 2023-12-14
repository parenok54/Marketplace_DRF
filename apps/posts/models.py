from django.db import models
from django.contrib.auth import get_user_model

from apps.categories.models import Category

User = get_user_model()

# Create your models here.
class Post(models.Model):
    category = models.ForeignKey(
        Category, on_delete=models.SET_NULL,
        related_name="category_posts",
        blank=True, null=True
    )
    user = models.ForeignKey(
        User, on_delete = models.SET_NULL,
        related_name = "users_posts",
        blank= True, null=True,
        verbose_name = "Пользователь"
    )
    title = models.CharField(
        max_length=255,
        verbose_name="Название"
    )
    description = models.TextField(
        max_length=500,
        verbose_name="Описание"
    )
    image = models.ImageField(
        upload_to="post_images/",
        verbose_name="Фотография"
    )
    created = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Дата создания"
    )

    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name = "Объявление"
        verbose_name_plural = "Объявления"