from rest_framework import serializers
from .models import TahsinSession, TahsinError

class TahsinSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TahsinSession
        fields = '__all__'

class TahsinErrorSerializer(serializers.ModelSerializer):
    class Meta:
        model = TahsinError
        fields = '__all__'
