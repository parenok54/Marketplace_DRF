from decimal import Decimal, InvalidOperation
from rest_framework.viewsets import GenericViewSet
from rest_framework import mixins, filters
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.pagination import PageNumberPagination

from apps.posts.models import Post
from apps.posts.serializers import PostSerializer, PostCreateSerializer
from apps.posts.permissions import PostPermission


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 12
    page_size_query_param = 'page_size'
    max_page_size = 100


class PostAPIView(GenericViewSet,
                  mixins.ListModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.CreateModelMixin,
                  mixins.UpdateModelMixin,
                  mixins.DestroyModelMixin):
    queryset = Post.objects.select_related('category', 'user').filter(is_active=True)
    serializer_class = PostSerializer
    pagination_class = StandardResultsSetPagination
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description']
    ordering_fields = ['price', 'created']
    ordering = ['-created']

    def get_queryset(self):
        queryset = super().get_queryset()

        category_id = self.request.query_params.get('category')
        if category_id:
            try:
                queryset = queryset.filter(category_id=int(category_id))
            except (ValueError, TypeError):
                pass

        category_slug = self.request.query_params.get('category_slug')
        if category_slug:
            queryset = queryset.filter(category__slug=category_slug)

        min_price = self.request.query_params.get('min_price')
        if min_price:
            try:
                queryset = queryset.filter(price__gte=Decimal(str(min_price).strip()))
            except (ValueError, TypeError, InvalidOperation):
                pass

        max_price = self.request.query_params.get('max_price')
        if max_price:
            try:
                queryset = queryset.filter(price__lte=Decimal(str(max_price).strip()))
            except (ValueError, TypeError, InvalidOperation):
                pass

        return queryset

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)

    def get_serializer_class(self):
        if self.action == "create":
            return PostCreateSerializer
        return PostSerializer

    def get_permissions(self):
        if self.action == "create":
            return (IsAuthenticated(), )
        if self.action in ('update', 'partial_update', 'destroy'):
            return (PostPermission(), )
        return (AllowAny(), )
