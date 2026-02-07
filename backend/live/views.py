from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import LiveSession
from .serializers import LiveSessionSerializer

class LiveSessionViewSet(viewsets.ModelViewSet):
    queryset = LiveSession.objects.filter(is_active=True)
    serializer_class = LiveSessionSerializer

    def perform_create(self, serializer):
        # Hanya user dengan role 'asatidz' yang bisa bikin live
        if self.request.user.role == 'asatidz':
            serializer.save(asatidz=self.request.user, is_active=True)
        else:
            raise PermissionError("Hanya Asatidz yang bisa memulai Live.")