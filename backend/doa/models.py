from django.db import models


class DoaHarian(models.Model):
    title = models.CharField(max_length=255)
    arab_text = models.TextField()
    latin_text = models.TextField(blank=True, null=True)
    translation = models.TextField()
    fadhilah = models.TextField(blank=True, null=True)
    audio_link = models.URLField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "doa_harian"
        ordering = ["-created_at"]

    def __str__(self):
        return self.title
