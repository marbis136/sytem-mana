from rest_framework import serializers
from .models import Cupon
from estados.models import EstadoGeneral


class CuponSerializer(serializers.ModelSerializer):
    estado = serializers.SlugRelatedField(
        queryset=EstadoGeneral.objects.all(),
        slug_field="nombre_estado"
    )

    class Meta:
        model = Cupon
        fields = "__all__"
