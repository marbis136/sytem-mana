from rest_framework import serializers
from .models import SubclasificacionMenu
from clasificaciones_menu.models import ClasificacionMenu
from estados.models import EstadoGeneral


class SubclasificacionMenuSerializer(serializers.ModelSerializer):
    clasificacion = serializers.SlugRelatedField(
        queryset=ClasificacionMenu.objects.all(),
        slug_field="name_clasificacion"
    )
    estado = serializers.SlugRelatedField(
        queryset=EstadoGeneral.objects.all(),
        slug_field="nombre_estado"
    )

    class Meta:
        model = SubclasificacionMenu
        fields = "__all__"
