from rest_framework import serializers
from .models import Almacen
from estados.models import EstadoGeneral
from tipo_almacen.models import TipoAlmacen
from sucursal.models import Sucursal


class AlmacenSerializer(serializers.ModelSerializer):
    # 👇 Para mostrar nombre en la respuesta
    estado_display = serializers.CharField(source="estado.nombre_estado", read_only=True)
    tipo_almacen_display = serializers.CharField(source="tipo_almacen.tipo_almacen", read_only=True)
    sucursal_display = serializers.CharField(source="sucursal.nombre_sucursal", read_only=True)

    # 👇 Para aceptar tanto ID como nombre en la creación/edición
    estado = serializers.SlugRelatedField(
        queryset=EstadoGeneral.objects.all(),
        slug_field="nombre_estado",
        required=True
    )
    tipo_almacen = serializers.SlugRelatedField(
        queryset=TipoAlmacen.objects.all(),
        slug_field="tipo_almacen",
        required=True
    )
    sucursal = serializers.SlugRelatedField(
        queryset=Sucursal.objects.all(),
        slug_field="nombre_sucursal",
        required=True
    )

    class Meta:
        model = Almacen
        fields = [
            "id",
            "estado",
            "estado_display",
            "tipo_almacen",
            "tipo_almacen_display",
            "sucursal",
            "sucursal_display",
            "nombre_almacen",
            "descripcion_almacen",
        ]
