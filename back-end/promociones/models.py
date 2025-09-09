from django.db import models

# Create your models here.
from django.db import models
from estados.models import EstadoGeneral


class Promocion(models.Model):
    porcentaje_descuento = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    monto_descuento = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    motivo_descuento = models.CharField(max_length=100, null=True, blank=True)
    descripcion = models.TextField(null=True, blank=True)

    estado = models.ForeignKey(EstadoGeneral, on_delete=models.CASCADE)

    def __str__(self):
        if self.motivo_descuento:
            return f"Promoción {self.motivo_descuento}"
        return f"Promoción {self.id}"
