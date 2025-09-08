from rest_framework import serializers
from .models import RolUsuario
from estados.models import EstadoGeneral

class RolUsuarioSerializer(serializers.ModelSerializer):
    estado = serializers.SlugRelatedField(
        queryset=EstadoGeneral.objects.all(),
        slug_field="nombre_estado"
    )

    class Meta:
        model = RolUsuario
        fields = "__all__"
