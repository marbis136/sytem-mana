from rest_framework import serializers
from .models import Horario
from estados.models import EstadoGeneral


class HorarioSerializer(serializers.ModelSerializer):
    estado = serializers.SlugRelatedField(
        queryset=EstadoGeneral.objects.all(),
        slug_field="nombre_estado"
    )

    class Meta:
        model = Horario
        fields = "__all__"
