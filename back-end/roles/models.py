from django.db import models

# Create your models here.
from django.db import models
from estados.models import EstadoGeneral

class RolUsuario(models.Model):
    nombre_rol = models.CharField(max_length=100, unique=True)
    descripcion_rol = models.TextField(blank=True, null=True)
    estado = models.ForeignKey(EstadoGeneral, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre_rol
