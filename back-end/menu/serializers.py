from rest_framework import serializers
from .models import Menu
from estados.models import EstadoGeneral
from sucursal.models import Sucursal
from subclasificaciones_menu.models import SubclasificacionMenu


class MenuSerializer(serializers.ModelSerializer):
    estado = serializers.SlugRelatedField(
        queryset=EstadoGeneral.objects.all(),
        slug_field="nombre_estado"
    )
    sucursal = serializers.SlugRelatedField(
        queryset=Sucursal.objects.all(),
        slug_field="nombre_sucursal"
    )
    subclasificacion = serializers.SlugRelatedField(
        queryset=SubclasificacionMenu.objects.all(),
        slug_field="name_subclasificacion",
        required=False,
        allow_null=True
    )

    class Meta:
        model = Menu
        fields = "__all__"
