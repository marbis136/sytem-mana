
# Create your views here.
from rest_framework.response import Response
from rest_framework import viewsets, permissions, status
from .models import ClasificacionProducto
from .serializers import ClasificacionProductoSerializer


class ClasificacionProductoViewSet(viewsets.ModelViewSet):
    queryset = ClasificacionProducto.objects.all()
    serializer_class = ClasificacionProductoSerializer
    permission_classes = [permissions.AllowAny]
    def create(self, request, *args, **kwargs):
        if isinstance(request.data, list):  # 👈 si mandan un array
            serializer = self.get_serializer(data=request.data, many=True)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return super().create(request, *args, **kwargs)