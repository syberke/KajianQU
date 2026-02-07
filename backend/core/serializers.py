from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'first_name', 'last_name', 'phone', 'role']

    def create(self, validated_data):
        role = validated_data.get('role', 'user')
        
        # Logika pembagian hak akses sesuai permintaanmu
        if role == 'admin':
            validated_data['is_superuser'] = True
            validated_data['is_staff'] = True
        elif role == 'asatidz':
            validated_data['is_staff'] = True
            
        # create_user akan otomatis meng-hash password
        user = User.objects.create_user(**validated_data)
        return user