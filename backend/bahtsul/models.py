from django.db import models
from django.conf import settings
class BahtsulMasail(models.Model):
    CATEGORY_CHOICES = (
        ("bahtsul", "Bahtsul Masail"),
        ("muamalat", "Muamalat"),
        ("quote", "Quote"),
    )

    category = models.CharField(
        max_length=20,
        choices=CATEGORY_CHOICES
    )
    title = models.CharField(max_length=255)
    content = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "bahtsul_masail"
        ordering = ["-created_at"]

    def __str__(self):
        return self.title
class BahtsulReference(models.Model):
    REFERENCE_TYPE = (
        ("article", "Article"),
        ("video", "Video"),
    )

    bahtsul = models.ForeignKey(
        BahtsulMasail,
        on_delete=models.CASCADE,
        related_name="references"
    )
    type = models.CharField(
        max_length=20,
        choices=REFERENCE_TYPE
    )
    link = models.URLField()

    class Meta:
        db_table = "bahtsul_references"

    def __str__(self):
        return f"{self.type} - {self.bahtsul.title}"
class Discussion(models.Model):
    bahtsul = models.ForeignKey(
        BahtsulMasail,
        on_delete=models.CASCADE,
        related_name="discussions"
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    message = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "discussions"
        ordering = ["created_at"]

    def __str__(self):
        return f"Discussion by {self.user}"
