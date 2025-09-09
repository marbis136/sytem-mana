from rest_framework import serializers
from .models import MenuPrecio
from estados.models import EstadoGeneral


class MenuPrecioSerializer(serializers.ModelSerializer):
    estado = serializers.SlugRelatedField(
        queryset=EstadoGeneral.objects.all(),
        slug_field="nombre_estado"
    )

    class Meta:
        model = MenuPrecio
        fields = "__all__"
