from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register('rooms', ChatRoomViewSet)
router.register('messages', ChatMessageViewSet)

urlpatterns = router.urls
