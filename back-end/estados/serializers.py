from rest_framework import serializers
from .models import EstadoGeneral

class EstadoGeneralSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstadoGeneral
        fields = "__all__"
