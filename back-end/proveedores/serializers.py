from rest_framework import serializers
from .models import Proveedor
from estados.models import EstadoGeneral


class ProveedorSerializer(serializers.ModelSerializer):
    estado = serializers.SlugRelatedField(
        queryset=EstadoGeneral.objects.all(),
        slug_field="nombre_estado"
    )

    class Meta:
        model = Proveedor
        fields = "__all__"
