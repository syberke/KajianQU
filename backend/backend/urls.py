from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
)
from rest_framework.authtoken import views as auth_views
from core.views import RegisterView 

urlpatterns = [
    path('admin/', admin.site.urls),

    # --- API Authentication ---
    path('api/login/', auth_views.obtain_auth_token, name='api_login'),
    path('api/register/', RegisterView.as_view(), name='api_register'),

    # --- API Modules ---
    path('api/core/', include('core.urls')),
    path('api/quran/', include('quran.urls')),
    path('api/tahsin/', include('tahsin.urls')),
    path('api/doa/', include('doa.urls')),
    path('api/bahtsul/', include('bahtsul.urls')),
    path('api/chat/', include('chat.urls')),
    path('api/asatidz/', include('asatidz.urls')),
    path('api/donation/', include('donation.urls')),
    path('api/live/', include('live.urls')),
    path('api/kajian/', include('kajian.urls')),

    # --- API Documentation ---
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
]