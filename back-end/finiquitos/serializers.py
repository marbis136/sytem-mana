from rest_framework import serializers
from .models import Finiquito
from contratos.models import Contrato
from estados.models import EstadoGeneral


class FiniquitoSerializer(serializers.ModelSerializer):
    contrato = serializers.SlugRelatedField(
        queryset=Contrato.objects.all(),
        slug_field="id"  # usamos el ID del contrato
    )
    estado = serializers.SlugRelatedField(
        queryset=EstadoGeneral.objects.all(),
        slug_field="nombre_estado"
    )

    class Meta:
        model = Finiquito
        fields = "__all__"
