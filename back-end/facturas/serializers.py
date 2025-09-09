from rest_framework import serializers
from .models import Factura
from ventas.models import Venta
from usuarios.models import Usuario
from sucursal.models import Sucursal
from estados.models import EstadoGeneral


class FacturaSerializer(serializers.ModelSerializer):
    venta = serializers.SlugRelatedField(
        queryset=Venta.objects.all(),
        slug_field="codigo_venta"
    )
    usuario = serializers.SlugRelatedField(
        queryset=Usuario.objects.all(),
        slug_field="login"
    )
    sucursal = serializers.SlugRelatedField(
        queryset=Sucursal.objects.all(),
        slug_field="nombre_sucursal"
    )
    estado = serializers.SlugRelatedField(
        queryset=EstadoGeneral.objects.all(),
        slug_field="nombre_estado"
    )

    class Meta:
        model = Factura
        fields = "__all__"
