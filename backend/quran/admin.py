from django.contrib import admin
from .models import QuranSurah
from .models import QuranAyat

@admin.register(QuranSurah)
class QuranSurahAdmin(admin.ModelAdmin):
    def has_delete_permission(self, request, obj=None):
        return request.user.role == 'admin'

@admin.register(QuranAyat)
class QuranAyahAdmin(admin.ModelAdmin):
    def has_delete_permission(self, request, obj=None):
        return request.user.role == 'admin'