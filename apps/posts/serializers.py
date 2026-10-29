from rest_framework import serializers

from apps.posts.models import Post
from apps.categories.serializers import CategorySerializer


class PostSerializer(serializers.ModelSerializer):
    category_detail = CategorySerializer(source='category', read_only=True)
    author_username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Post
        fields = (
            'id',
            'title',
            'price',
            'description',
            'image',
            'external_code',
            'is_active',
            'created',
            'category',
            'category_detail',
            'user',
            'author_username',
        )


class PostCreateSerializer(serializers.ModelSerializer):
    category_detail = CategorySerializer(source='category', read_only=True)
    author_username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Post
        fields = (
            'id',
            'title',
            'price',
            'description',
            'image',
            'category',
            'category_detail',
            'author_username',
        )
