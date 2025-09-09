from rest_framework import serializers
from .models import Cliente
from estados.models import EstadoGeneral


class ClienteSerializer(serializers.ModelSerializer):
    estado = serializers.SlugRelatedField(
        queryset=EstadoGeneral.objects.all(),
        slug_field="nombre_estado"
    )

    class Meta:
        model = Cliente
        fields = "__all__"
