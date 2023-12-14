from rest_framework.viewsets import GenericViewSet
from rest_framework import mixins

from apps.categories.models import Category
from apps.categories.serializers import CategorySerializer

# Create your views here.
class CategoryAPIView(GenericViewSet,
                      mixins.ListModelMixin,
                      mixins.RetrieveModelMixin,
                      mixins.CreateModelMixin,
                      mixins.UpdateModelMixin,
                      mixins.DestroyModelMixin):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
