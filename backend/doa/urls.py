from rest_framework.routers import DefaultRouter
from .views import DoaViewSet

router = DefaultRouter()
router.register('doa', DoaViewSet)

urlpatterns = router.urls
