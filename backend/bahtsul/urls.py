from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register('topics', BahtsulViewSet)
router.register('references', BahtsulRefViewSet)

urlpatterns = router.urls
