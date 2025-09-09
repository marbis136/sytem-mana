from rest_framework import serializers
from .models import Venta
from usuarios.models import Usuario
from sucursal.models import Sucursal
from clientes.models import Cliente
from promociones.models import Promocion
from cupones.models import Cupon
from cierres.models import CierreVenta
from estados.models import EstadoGeneral


class VentaSerializer(serializers.ModelSerializer):
    usuario = serializers.SlugRelatedField(
        queryset=Usuario.objects.all(),
        slug_field="login"
    )
    sucursal = serializers.SlugRelatedField(
        queryset=Sucursal.objects.all(),
        slug_field="nombre_sucursal"
    )
    cliente = serializers.SlugRelatedField(
        queryset=Cliente.objects.all(),
        slug_field="name_cliente",
        required=False,
        allow_null=True
    )
    promocion = serializers.SlugRelatedField(
        queryset=Promocion.objects.all(),
        slug_field="motivo_descuento",
        required=False,
        allow_null=True
    )
    cupon = serializers.SlugRelatedField(
        queryset=Cupon.objects.all(),
        slug_field="codigo",
        required=False,
        allow_null=True
    )
    cierre = serializers.SlugRelatedField(
        queryset=CierreVenta.objects.all(),
        slug_field="id",
        required=False,
        allow_null=True
    )
    estado = serializers.SlugRelatedField(
        queryset=EstadoGeneral.objects.all(),
        slug_field="nombre_estado"
    )

    class Meta:
        model = Venta
        fields = "__all__"
