from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import *
from .serializers import *
from core.permissions import IsAdminOrAsatidzCRUD
from rest_framework.permissions import IsAuthenticated


class ChatRoomViewSet(ModelViewSet):
    queryset = ChatRoom.objects.all()
    serializer_class = ChatRoomSerializer

    def get_permissions(self):
        if self.action in ['create']:
            return [IsAuthenticated()]
        return [IsAdminOrAsatidzCRUD()]

class ChatMessageViewSet(ModelViewSet):
    queryset = ChatMessage.objects.all()
    serializer_class = ChatMessageSerializer

    def get_permissions(self):
        if self.action in ['create']:
            return [IsAuthenticated()]
        return [IsAdminOrAsatidzCRUD()]

