from rest_framework import serializers
from .models import Insumo
from estados.models import EstadoGeneral
from proveedores.models import Proveedor
from almacenes.models import Almacen


class InsumoSerializer(serializers.ModelSerializer):
    estado = serializers.SlugRelatedField(
        queryset=EstadoGeneral.objects.all(),
        slug_field="nombre_estado"
    )
    proveedor = serializers.SlugRelatedField(
        queryset=Proveedor.objects.all(),
        slug_field="nombre"
    )
    almacen = serializers.SlugRelatedField(
        queryset=Almacen.objects.all(),
        slug_field="nombre_almacen"
    )

    class Meta:
        model = Insumo
        fields = "__all__"
