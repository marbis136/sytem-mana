from rest_framework import serializers
from .models import TipoAlmacen
from estados.models import EstadoGeneral

class TipoAlmacenSerializer(serializers.ModelSerializer):
    estado = serializers.SlugRelatedField(
        queryset=EstadoGeneral.objects.all(),
        slug_field="nombre_estado"
    )

    class Meta:
        model = TipoAlmacen
        fields = "__all__"
