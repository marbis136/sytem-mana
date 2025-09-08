from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import TipoAlmacen
from .serializers import TipoAlmacenSerializer

class TipoAlmacenViewSet(viewsets.ModelViewSet):
    queryset = TipoAlmacen.objects.all()
    serializer_class = TipoAlmacenSerializer
