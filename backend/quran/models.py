from django.db import models

class QuranSurah(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100)
    total_ayat = models.IntegerField()

class QuranAyat(models.Model):
    surah = models.ForeignKey(QuranSurah, on_delete=models.CASCADE)
    ayat_number = models.IntegerField()
    arab_text = models.TextField()
    translation = models.TextField()
    tafsir = models.TextField()
