from rest_framework import serializers
from .models import Producto
from estados.models import EstadoGeneral
from insumos.models import Insumo
from subclasificaciones.models import SubclasificacionProducto


class ProductoSerializer(serializers.ModelSerializer):
    estado = serializers.SlugRelatedField(
        queryset=EstadoGeneral.objects.all(),
        slug_field="nombre_estado"
    )
    insumo = serializers.SlugRelatedField(
        queryset=Insumo.objects.all(),
        slug_field="nombre_insumo",
        required=False,
        allow_null=True
    )
    subclasificacion = serializers.SlugRelatedField(
        queryset=SubclasificacionProducto.objects.all(),
        slug_field="name_subclasificacion"
    )

    class Meta:
        model = Producto
        fields = "__all__"
