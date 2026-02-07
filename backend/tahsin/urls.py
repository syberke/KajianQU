from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register('sessions', TahsinSessionViewSet)
router.register('errors', TahsinErrorViewSet)

urlpatterns = router.urls
