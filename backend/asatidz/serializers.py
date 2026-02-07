from rest_framework import serializers
from .models import AsatidzProfile, Keilmuan

class KeilmuanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Keilmuan
        fields = '__all__'

class AsatidzProfileSerializer(serializers.ModelSerializer):

    photo = serializers.ImageField(required=False, allow_null=True)
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = AsatidzProfile
        fields = ['id', 'kode_asatidz', 'bank_name', 'bank_account', 'bio', 'photo', 'user', 'keilmuan']