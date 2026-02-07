from rest_framework import serializers
from .models import Kitab, BabKitab, Video

class KitabSerializer(serializers.ModelSerializer):
    class Meta:
        model = Kitab
        fields = '__all__'

class BabKitabSerializer(serializers.ModelSerializer):
    class Meta:
        model = BabKitab
        fields = '__all__'

class VideoSerializer(serializers.ModelSerializer):
    # Buat asatidz jadi read_only agar otomatis terisi siapa yang upload
    asatidz = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Video
        fields = '__all__'