from rest_framework.routers import DefaultRouter

from apps.users.views import UserAPIView

router = DefaultRouter()
router.register('', UserAPIView, "api_users")

urlpatterns = router.urls