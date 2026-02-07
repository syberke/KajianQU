from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from .serializers import RegisterSerializer

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        # Buat token otomatis setelah register
        token, created = Token.objects.get_or_create(user=user)
        
        return Response({
            "user": serializer.data,
            "token": token.key
        }, status=status.HTTP_201_CREATED)