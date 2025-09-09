from django.db import models

# Create your models here.
from django.db import models
from estados.models import EstadoGeneral


class Cupon(models.Model):
    codigo = models.CharField(max_length=50, unique=True)
    descripcion = models.TextField(null=True, blank=True)
    descuento = models.DecimalField(max_digits=10, decimal_places=2)
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField()

    estado = models.ForeignKey(EstadoGeneral, on_delete=models.CASCADE)

    def __str__(self):
        return f"Cupon {self.codigo}"
