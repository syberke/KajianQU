from rest_framework import serializers
from .models import LiveSession

class LiveSessionSerializer(serializers.ModelSerializer):
    nama_asatidz = serializers.ReadOnlyField(source='asatidz.username')

    class Meta:
        model = LiveSession
        fields = '__all__'