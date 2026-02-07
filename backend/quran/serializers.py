from rest_framework import serializers
from .models import QuranSurah, QuranAyat

class QuranSurahSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuranSurah
        fields = '__all__'

class QuranAyatSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuranAyat
        fields = '__all__'
