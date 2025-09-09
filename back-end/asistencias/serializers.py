from rest_framework import serializers
from .models import Asistencia
from personal.models import Personal
from horarios.models import Horario


class AsistenciaSerializer(serializers.ModelSerializer):
    personal = serializers.SlugRelatedField(
        queryset=Personal.objects.all(),
        slug_field="nombre"
    )
    horario = serializers.SlugRelatedField(
        queryset=Horario.objects.all(),
        slug_field="nombre_horario"
    )

    class Meta:
        model = Asistencia
        fields = "__all__"
