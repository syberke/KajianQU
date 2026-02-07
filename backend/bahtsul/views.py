from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import *
from .serializers import *
from core.permissions import IsAdminOrAsatidzCRUD
from rest_framework.permissions import BasePermission

class BahtsulViewSet(ModelViewSet):
    queryset = BahtsulMasail.objects.all()
    serializer_class = BahtsulSerializer
permission_classes = [IsAdminOrAsatidzCRUD]
class BahtsulRefViewSet(ModelViewSet):
    queryset = BahtsulReference.objects.all()
    serializer_class = BahtsulRefSerializer
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

