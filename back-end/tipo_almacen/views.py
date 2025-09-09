from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, permissions, status
from .models import TipoAlmacen
from .serializers import TipoAlmacenSerializer
from rest_framework.response import Response

class TipoAlmacenViewSet(viewsets.ModelViewSet):
    queryset = TipoAlmacen.objects.all()
    serializer_class = TipoAlmacenSerializer
    permission_classes = [permissions.AllowAny]  # 👈 hace público el endpoint

    def create(self, request, *args, **kwargs):
        if isinstance(request.data, list):  # 👈 si mandan un array
            serializer = self.get_serializer(data=request.data, many=True)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return super().create(request, *args, **kwargs)