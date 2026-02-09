from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LiveSessionViewSet
from .views import LiveSessionViewSet, get_stream_token

router = DefaultRouter()
router.register(r'sessions', LiveSessionViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('token/', get_stream_token, name='stream_token'),
]