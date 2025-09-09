from rest_framework import serializers
from .models import Aguinaldo
from contratos.models import Contrato
from estados.models import EstadoGeneral


class AguinaldoSerializer(serializers.ModelSerializer):
    contrato = serializers.SlugRelatedField(
        queryset=Contrato.objects.all(),
        slug_field="id"  # se puede cambiar a otro campo si prefieres
    )
    estado = serializers.SlugRelatedField(
        queryset=EstadoGeneral.objects.all(),
        slug_field="nombre_estado"
    )

    class Meta:
        model = Aguinaldo
        fields = "__all__"
