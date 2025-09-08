from rest_framework import serializers
from .models import Sucursal
from estados.models import EstadoGeneral


class SucursalSerializer(serializers.ModelSerializer):
    estado = serializers.SlugRelatedField(
        queryset=EstadoGeneral.objects.all(),
        slug_field="nombre_estado"
    )

    class Meta:
        model = Sucursal
        fields = "__all__"
