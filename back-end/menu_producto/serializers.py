from rest_framework import serializers
from .models import MenuProducto
from productos.models import Producto


class MenuProductoSerializer(serializers.ModelSerializer):
    producto = serializers.SlugRelatedField(
        queryset=Producto.objects.all(),
        slug_field="name_producto"
    )

    class Meta:
        model = MenuProducto
        fields = "__all__"
