from rest_framework import viewsets, permissions
from .models import Donation
from .serializers import DonationSerializer

class DonationViewSet(viewsets.ModelViewSet):
    queryset = Donation.objects.all()
    serializer_class = DonationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        # Otomatis set user yang sedang login saat donasi dibuat
        serializer.save(user=self.request.user)

    def get_queryset(self):
        # Admin bisa lihat semua, User biasa cuma bisa lihat donasi miliknya
        if self.request.user.role == 'admin':
            return Donation.objects.all()
        return Donation.objects.filter(user=self.request.user)