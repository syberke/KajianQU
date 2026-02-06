from django.db import models

# live/models.py
class Live(models.Model):
    asatidz = models.ForeignKey('asatidz.AsatidzProfile', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    theme = models.CharField(max_length=200)
    scheduled_at = models.DateTimeField()
    type = models.CharField(max_length=20)
    status = models.CharField(max_length=20)
