from django.db import models
from django.conf import settings

class Donation(models.Model):
    DONATION_TYPES = (
        ('infaq', 'Infaq Asatidz'),
        ('sodaqoh', 'Sodaqoh'),
        ('al_quran', 'Wakaf Al-Quran'),
    )
    
    STATUS_CHOICES = (
        ('pending', 'Menunggu Verifikasi'),
        ('approved', 'Disetujui'),
        ('rejected', 'Ditolak'),
    )

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    tipe_donasi = models.CharField(max_length=20, choices=DONATION_TYPES)
    nominal = models.DecimalField(max_digits=12, decimal_places=2)
    bukti_transfer = models.ImageField(upload_to='donasi/bukti/')
    catatan = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default='pending')
    tanggal_donasi = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.tipe_donasi} - Rp{self.nominal}"