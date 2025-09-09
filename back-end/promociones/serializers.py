from rest_framework import serializers
from .models import Promocion
from estados.models import EstadoGeneral


class PromocionSerializer(serializers.ModelSerializer):
    estado = serializers.SlugRelatedField(
        queryset=EstadoGeneral.objects.all(),
        slug_field="nombre_estado"
    )

    class Meta:
        model = Promocion
        fields = "__all__"
