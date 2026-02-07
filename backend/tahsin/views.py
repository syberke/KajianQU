from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import *
from .serializers import *

class TahsinSessionViewSet(ModelViewSet):
    queryset = TahsinSession.objects.all()
    serializer_class = TahsinSessionSerializer

class TahsinErrorViewSet(ModelViewSet):
    queryset = TahsinError.objects.all()
    serializer_class = TahsinErrorSerializer
