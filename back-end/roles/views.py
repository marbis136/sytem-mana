from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import RolUsuario
from .serializers import RolUsuarioSerializer

class RolUsuarioViewSet(viewsets.ModelViewSet):
    queryset = RolUsuario.objects.all()
    serializer_class = RolUsuarioSerializer
