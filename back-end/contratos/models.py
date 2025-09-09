from django.db import models

# Create your models here.
from django.db import models
from personal.models import Personal
from estados.models import EstadoGeneral


class Contrato(models.Model):
    personal = models.ForeignKey(Personal, on_delete=models.CASCADE)
    sueldo_minimo = models.DecimalField(max_digits=10, decimal_places=2)
    horas_extras = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    descuentos = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    aumento = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    fecha_inicio = models.DateField()

    estado = models.ForeignKey(EstadoGeneral, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Contrato {self.id} - {self.personal.nombre}"
