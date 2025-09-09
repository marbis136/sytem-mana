from rest_framework import serializers
from .models import CierreVenta
from usuarios.models import Usuario


class CierreVentaSerializer(serializers.ModelSerializer):
    usuario = serializers.SlugRelatedField(
        queryset=Usuario.objects.all(),
        slug_field="login"
    )

    class Meta:
        model = CierreVenta
        fields = "__all__"
