from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import EstadoGeneral
from .serializers import EstadoGeneralSerializer

class EstadoGeneralViewSet(viewsets.ModelViewSet):
    queryset = EstadoGeneral.objects.all()
    serializer_class = EstadoGeneralSerializer
