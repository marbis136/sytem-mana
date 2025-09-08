from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Almacen
from .serializers import AlmacenSerializer

class AlmacenViewSet(viewsets.ModelViewSet):
    queryset = Almacen.objects.all()
    serializer_class = AlmacenSerializer
