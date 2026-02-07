from rest_framework import serializers
from .models import DoaHarian

class DoaSerializer(serializers.ModelSerializer):
    class Meta:
        model = DoaHarian
        fields = '__all__'
