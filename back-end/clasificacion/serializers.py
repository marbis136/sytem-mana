from rest_framework import serializers
from .models import ClasificacionProducto
from estados.models import EstadoGeneral


class ClasificacionProductoSerializer(serializers.ModelSerializer):
    estado = serializers.SlugRelatedField(
        queryset=EstadoGeneral.objects.all(),
        slug_field="nombre_estado"
    )

    class Meta:
        model = ClasificacionProducto
        fields = "__all__"
