from django.db import models

# Create your models here.
from django.db import models
from estados.models import EstadoGeneral
from sucursal.models import Sucursal


class Personal(models.Model):
    nombre = models.CharField(max_length=100)
    apellido_paterno = models.CharField(max_length=100)
    apellido_materno = models.CharField(max_length=100, null=True, blank=True)
    fecha_nacimiento = models.DateField()
    fecha_ingreso_empresa = models.DateField()
    fecha_salida_empresa = models.DateField(null=True, blank=True)
    observacion = models.TextField(null=True, blank=True)

    estado = models.ForeignKey(EstadoGeneral, on_delete=models.CASCADE)
    sucursal = models.ForeignKey(Sucursal, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.nombre} {self.apellido_paterno}"
