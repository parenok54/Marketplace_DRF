from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.http import HttpResponse
from django.shortcuts import redirect
from django.views.static import serve
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="Marketplace DRF API",
        default_version='v1',
        description="API документация для маркетплейса на Django REST Framework",
        contact=openapi.Contact(email="admin@marketplace.local"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)


def index_view(request):
    dist_index = settings.BASE_DIR / 'frontend' / 'dist' / 'index.html'
    if dist_index.exists():
        with open(dist_index, 'r', encoding='utf-8') as f:
            return HttpResponse(f.read(), content_type='text/html')
    return redirect('/swagger/')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/posts/', include('apps.posts.urls')),
    path('api/categories/', include('apps.categories.urls')),
    path('api/users/', include('apps.users.urls')),

    # docs
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name="swagger"),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name="redoc"),

    # frontend static assets & SPA index
    re_path(r'^assets/(?P<path>.*)$', serve, {'document_root': settings.BASE_DIR / 'frontend' / 'dist' / 'assets'}),
    path('', index_view, name='index'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
