from django.db import models
from django.conf import settings

class LiveSession(models.Model):
    SESSION_TYPES = (
        ('private', 'Kelas Private'),
        ('public', 'Kajian Umum'),
    )
    
    asatidz = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='sessions')
    tema = models.CharField(max_length=255)
    bidang_keilmuan = models.CharField(max_length=100)
    kode_room = models.CharField(max_length=10, unique=True) 
    is_active = models.BooleanField(default=False)
    link_kitab = models.URLField(blank=True, null=True)
    jumlah_audiens = models.IntegerField(default=0)
    mulai_pada = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.tema} - {self.asatidz.username}"