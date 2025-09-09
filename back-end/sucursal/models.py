# Create your models here.
from django.db import models
from estados.models import EstadoGeneral


class Sucursal(models.Model):
    nombre_sucursal = models.CharField(max_length=100, unique=True)
    ciudad = models.CharField(max_length=100)
    ubicacion = models.CharField(max_length=255, blank=True, null=True)
    incremento = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    estado = models.ForeignKey(EstadoGeneral, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.nombre_sucursal} - {self.ciudad}"
