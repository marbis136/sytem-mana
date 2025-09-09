from rest_framework import serializers
from .models import Contrato
from personal.models import Personal
from estados.models import EstadoGeneral


class ContratoSerializer(serializers.ModelSerializer):
    personal = serializers.SlugRelatedField(
        queryset=Personal.objects.all(),
        slug_field="nombre"
    )
    estado = serializers.SlugRelatedField(
        queryset=EstadoGeneral.objects.all(),
        slug_field="nombre_estado"
    )

    class Meta:
        model = Contrato
        fields = "__all__"
