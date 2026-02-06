from django.db import models
from asatidz.models import Keilmuan, AsatidzProfile

class Kitab(models.Model):
    keilmuan = models.ForeignKey(Keilmuan, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    download_link = models.URLField()

class BabKitab(models.Model):
    kitab = models.ForeignKey(Kitab, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    summary = models.TextField()
    youtube_link = models.URLField()

class Video(models.Model):
    STATUS = (
        ('draft','Draft'),
        ('review','Review'),
        ('approved','Approved'),
        ('rejected','Rejected'),
    )

    asatidz = models.ForeignKey(AsatidzProfile, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField()
    duration = models.IntegerField()
    youtube_link = models.URLField()
    status = models.CharField(max_length=10, choices=STATUS)
    created_at = models.DateTimeField(auto_now_add=True)
