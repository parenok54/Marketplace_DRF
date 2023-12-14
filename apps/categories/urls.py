from rest_framework.routers import DefaultRouter

from apps.categories.views import CategoryAPIView
 

router = DefaultRouter()
router.register('', CategoryAPIView, "api_category")

urlpatterns= router.urls