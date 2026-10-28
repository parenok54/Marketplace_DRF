from django.contrib import admin

from apps.posts.models import Post


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'price', 'is_active', 'created')
    list_filter = ('category', 'is_active', 'created')
    search_fields = ('title', 'description', 'external_code')
