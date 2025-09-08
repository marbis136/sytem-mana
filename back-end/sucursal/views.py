from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Sucursal
from .serializers import SucursalSerializer


class SucursalViewSet(viewsets.ModelViewSet):
    queryset = Sucursal.objects.all()
    serializer_class = SucursalSerializer
