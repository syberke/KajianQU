from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from core.permissions import IsAdminOrAsatidzCRUD
from .models import QuranSurah, QuranAyat
from .serializers import *
from rest_framework.permissions import BasePermission

class QuranSurahViewSet(ModelViewSet):
    queryset = QuranSurah.objects.all()
    serializer_class = QuranSurahSerializer
    permission_classes = [IsAdminOrAsatidzCRUD]

class QuranAyatViewSet(ModelViewSet):
    queryset = QuranAyat.objects.all()
    serializer_class = QuranAyatSerializer
    permission_classes = [IsAdminOrAsatidzCRUD]

class IsAdminDeleteOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method == 'DELETE':
            return request.user.role == 'admin'
        return True
permission_classes = [
    IsAdminOrAsatidzCRUD,
    IsAdminDeleteOnly
]

    