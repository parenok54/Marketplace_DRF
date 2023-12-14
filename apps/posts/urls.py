from rest_framework.routers import DefaultRouter

from apps.posts.views import PostAPIView

router = DefaultRouter()
router.register('', PostAPIView, "api_posts")

urlpatterns = router.urls