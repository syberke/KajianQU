from django.db import models
from core.models import User
from quran.models import QuranAyat

class TahsinSession(models.Model):
    MODE = (('tahsin','Tahsin'), ('murojaah','Murojaah'))

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    surah_start = models.IntegerField()
    ayat_start = models.IntegerField()
    surah_end = models.IntegerField()
    ayat_end = models.IntegerField()
    juz_start = models.IntegerField()
    juz_end = models.IntegerField()
    mode = models.CharField(max_length=10, choices=MODE)
    created_at = models.DateTimeField(auto_now_add=True)

class TahsinError(models.Model):
    session = models.ForeignKey(TahsinSession, on_delete=models.CASCADE)
    ayat = models.ForeignKey(QuranAyat, on_delete=models.CASCADE)
    error_note = models.TextField()
