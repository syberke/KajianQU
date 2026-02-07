from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import KitabViewSet, BabKitabViewSet, VideoViewSet

router = DefaultRouter()
router.register(r'kitab', KitabViewSet)
router.register(r'bab-kitab', BabKitabViewSet)
router.register(r'video', VideoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]