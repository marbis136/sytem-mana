from rest_framework import serializers
from .models import PreciosProducto
from productos.models import Producto
from estados.models import EstadoGeneral


class PreciosProductoSerializer(serializers.ModelSerializer):
    producto = serializers.SlugRelatedField(
        queryset=Producto.objects.all(),
        slug_field="name_producto"
    )
    estado = serializers.SlugRelatedField(
        queryset=EstadoGeneral.objects.all(),
        slug_field="nombre_estado"
    )

    class Meta:
        model = PreciosProducto
        fields = "__all__"
