from rest_framework import serializers

from apps.posts.models import Post

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post 
        fields = ('id', 'title', 'description', 'image',
                  'created', 'category', 'user')
        
class PostCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post 
        fields = ('id', 'title', 'description',
                  'image', 'created', 'category')