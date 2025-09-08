from rest_framework import serializers
from .models import Usuario
from roles.models import RolUsuario
from almacenes.models import Almacen
from estados.models import EstadoGeneral
import base64


class UsuarioSerializer(serializers.ModelSerializer):
    rol = serializers.SlugRelatedField(
        queryset=RolUsuario.objects.all(),
        slug_field="nombre_rol",
        required=False,
        allow_null=True
    )
    almacen = serializers.SlugRelatedField(
        queryset=Almacen.objects.all(),
        slug_field="nombre_almacen",
        required=False,
        allow_null=True
    )
    estado = serializers.SlugRelatedField(
        queryset=EstadoGeneral.objects.all(),
        slug_field="nombre_estado",
        required=False,
        allow_null=True
    )

    class Meta:
        model = Usuario
        fields = [
            'id', 'nombre', 'apellido_paterno', 'apellido_materno',
            'ci', 'correo', 'foto_usuario',
            'login', 'password',
            'rol', 'almacen', 'estado'
        ]
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = Usuario(**validated_data)
        user.set_password(password)  # encripta antes de guardar
        user.save()
        return user
