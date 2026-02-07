from django.shortcuts import render
from rest_framework import viewsets
from .models import Kitab, BabKitab, Video
from .serializers import KitabSerializer, BabKitabSerializer, VideoSerializer
from core.permissions import IsAdminOrAsatidzCRUD # Asumsi pakai permission yang sama

class KitabViewSet(viewsets.ModelViewSet):
    queryset = Kitab.objects.all()
    serializer_class = KitabSerializer
    permission_classes = [IsAdminOrAsatidzCRUD]

class BabKitabViewSet(viewsets.ModelViewSet):
    queryset = BabKitab.objects.all()
    serializer_class = BabKitabSerializer
    permission_classes = [IsAdminOrAsatidzCRUD]

class VideoViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    permission_classes = [IsAdminOrAsatidzCRUD]

    def perform_create(self, serializer):
        # Otomatis set asatidz berdasarkan user yang login
        # (Pastikan User login punya profil AsatidzProfile)
        serializer.save(asatidz=self.request.user.asatidzprofile)