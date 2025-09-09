from django.db import models

# Create your models here.
from django.db import models
from estados.models import EstadoGeneral


class Proveedor(models.Model):
    nombre = models.CharField(max_length=100)
    contacto = models.CharField(max_length=100, null=True, blank=True)
    telefono = models.CharField(max_length=50, null=True, blank=True)
    email = models.EmailField(max_length=100, null=True, blank=True)
    direccion = models.TextField(null=True, blank=True)

    estado = models.ForeignKey(EstadoGeneral, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre
