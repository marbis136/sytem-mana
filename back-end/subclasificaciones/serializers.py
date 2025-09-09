from rest_framework import serializers
from .models import SubclasificacionProducto
from estados.models import EstadoGeneral
from clasificacion.models import ClasificacionProducto


class SubclasificacionProductoSerializer(serializers.ModelSerializer):
    estado = serializers.SlugRelatedField(
        queryset=EstadoGeneral.objects.all(),
        slug_field="nombre_estado"
    )
    clasificacion = serializers.SlugRelatedField(
        queryset=ClasificacionProducto.objects.all(),
        slug_field="name_clasificacion"
    )

    class Meta:
        model = SubclasificacionProducto
        fields = "__all__"
