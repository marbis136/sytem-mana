from rest_framework import serializers
from .models import Puntos
from clientes.models import Cliente
from promociones.models import Promocion
from estados.models import EstadoGeneral


class PuntosSerializer(serializers.ModelSerializer):
    cliente = serializers.SlugRelatedField(
        queryset=Cliente.objects.all(),
        slug_field="name_cliente"
    )
    promocion = serializers.SlugRelatedField(
        queryset=Promocion.objects.all(),
        slug_field="motivo_descuento",
        required=False,
        allow_null=True
    )
    estado = serializers.SlugRelatedField(
        queryset=EstadoGeneral.objects.all(),
        slug_field="nombre_estado"
    )

    class Meta:
        model = Puntos
        fields = "__all__"
