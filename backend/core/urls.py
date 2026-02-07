from django.urls import path
from rest_framework.authtoken import views as auth_views
from .views import RegisterView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', auth_views.obtain_auth_token, name='login'),
]