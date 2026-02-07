from rest_framework import serializers
from .models import BahtsulMasail, BahtsulReference

class BahtsulSerializer(serializers.ModelSerializer):
    class Meta:
        model = BahtsulMasail
        fields = '__all__'

class BahtsulRefSerializer(serializers.ModelSerializer):
    class Meta:
        model = BahtsulReference
        fields = '__all__'
