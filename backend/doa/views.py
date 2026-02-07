from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from core.permissions import IsAdminOrAsatidzCRUD
from .models import DoaHarian
from .serializers import DoaSerializer
from rest_framework.permissions import BasePermission


class DoaViewSet(ModelViewSet):
    queryset = DoaHarian.objects.all()
    serializer_class = DoaSerializer
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
