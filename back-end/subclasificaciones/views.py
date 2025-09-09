
# Create your views here.
from rest_framework.response import Response
from rest_framework import viewsets, permissions, status
from .models import SubclasificacionProducto
from .serializers import SubclasificacionProductoSerializer


class SubclasificacionProductoViewSet(viewsets.ModelViewSet):
    queryset = SubclasificacionProducto.objects.all()
    serializer_class = SubclasificacionProductoSerializer
    permission_classes = [permissions.AllowAny]
    def create(self, request, *args, **kwargs):
        if isinstance(request.data, list):  # 👈 si mandan un array
            serializer = self.get_serializer(data=request.data, many=True)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return super().create(request, *args, **kwargs)