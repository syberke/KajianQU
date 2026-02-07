from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AsatidzProfileViewSet, KeilmuanViewSet

router = DefaultRouter()
router.register(r'asatidz', AsatidzProfileViewSet)
router.register(r'keilmuan', KeilmuanViewSet)

urlpatterns = [
    path('', include(router.urls)),
]