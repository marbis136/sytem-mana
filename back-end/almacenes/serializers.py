from rest_framework import serializers
from .models import Almacen
from estados.models import EstadoGeneral
from tipo_almacen.models import TipoAlmacen
from sucursal.models import Sucursal

class AlmacenSerializer(serializers.ModelSerializer):
    estado = serializers.SlugRelatedField(
        queryset=EstadoGeneral.objects.all(),
        slug_field="nombre_estado"
    )
    tipo_almacen = serializers.SlugRelatedField(
        queryset=TipoAlmacen.objects.all(),
        slug_field="tipo_almacen"
    )
    sucursal = serializers.SlugRelatedField(
        queryset=Sucursal.objects.all(),
        slug_field="nombre_sucursal"
    )

    class Meta:
        model = Almacen
        fields = "__all__"
