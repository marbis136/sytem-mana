from django.db import models

# Create your models here.
from django.db import models
from estados.models import EstadoGeneral


class Cliente(models.Model):
    codigo_cliente = models.CharField(max_length=50, unique=True, null=True, blank=True)
    name_cliente = models.CharField(max_length=100)
    ci_nit = models.CharField(max_length=50, unique=True)
    email = models.EmailField(max_length=100, null=True, blank=True)
    telefono = models.CharField(max_length=50, null=True, blank=True)
    direccion = models.CharField(max_length=255, null=True, blank=True)
    observaciones = models.TextField(null=True, blank=True)
    fecha_nacimiento = models.DateField(null=True, blank=True)

    estado = models.ForeignKey(EstadoGeneral, on_delete=models.CASCADE)

    def __str__(self):
        return self.name_cliente
