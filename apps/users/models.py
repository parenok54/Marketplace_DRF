from django.db import models

from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    profile_image = models.ImageField(
        upload_to='profiles_images/',
        verbose_name="Фотография пользователя",
        blank=True, null=True
    )

    def __str__(self):
        return self.username
    
    class Meta:
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"