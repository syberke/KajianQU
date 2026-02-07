from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser # Tambahkan ini
from .models import AsatidzProfile, Keilmuan
from .serializers import AsatidzProfileSerializer, KeilmuanSerializer
from core.permissions import IsAdminOrAsatidzCRUD 

class KeilmuanViewSet(viewsets.ModelViewSet):
    queryset = Keilmuan.objects.all()
    serializer_class = KeilmuanSerializer
    permission_classes = [IsAdminOrAsatidzCRUD]

class AsatidzProfileViewSet(viewsets.ModelViewSet):
    queryset = AsatidzProfile.objects.all()
    serializer_class = AsatidzProfileSerializer
    permission_classes = [IsAdminOrAsatidzCRUD]
    parser_classes = (MultiPartParser, FormParser, JSONParser)

    def get_queryset(self):
        qs = super().get_queryset()
        print(f"Total data di database: {qs.count()}") # Cek di terminal
        return qs

    def perform_create(self, serializer):
        print(f"User yang sedang login: {self.request.user}") # Cek di terminal
        serializer.save(user=self.request.user)
        
    def perform_update(self, serializer):
        serializer.save(user=self.request.user)