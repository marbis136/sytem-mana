from rest_framework import serializers
from .models import ClasificacionMenu
from estados.models import EstadoGeneral


class ClasificacionMenuSerializer(serializers.ModelSerializer):
    estado = serializers.SlugRelatedField(
        queryset=EstadoGeneral.objects.all(),
        slug_field="nombre_estado"
    )

    class Meta:
        model = ClasificacionMenu
        fields = "__all__"
