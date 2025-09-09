from rest_framework import serializers
from .models import Personal
from estados.models import EstadoGeneral
from sucursal.models import Sucursal


class PersonalSerializer(serializers.ModelSerializer):
    estado = serializers.SlugRelatedField(
        queryset=EstadoGeneral.objects.all(),
        slug_field="nombre_estado"
    )
    sucursal = serializers.SlugRelatedField(
        queryset=Sucursal.objects.all(),
        slug_field="nombre_sucursal"
    )

    class Meta:
        model = Personal
        fields = "__all__"
