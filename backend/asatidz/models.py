from django.db import models
from core.models import User

class Keilmuan(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

class AsatidzProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    kode_asatidz = models.CharField(max_length=50)
    keilmuan = models.ForeignKey(Keilmuan, on_delete=models.SET_NULL, null=True)
    bank_name = models.CharField(max_length=50)
    bank_account = models.CharField(max_length=50)
    bio = models.TextField()
    photo = models.ImageField(upload_to='asatidz/')
