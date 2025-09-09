from django.db import models

# Create your models here.
from django.db import models
from usuarios.models import Usuario


class CierreVenta(models.Model):
    fecha_cierre = models.DateField()
    hora_cierre = models.TimeField()
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    total_ventas = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total_efectivo = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total_tarjeta = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total_transferencia = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total_descuentos = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    observaciones = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"Cierre {self.fecha_cierre} - Usuario {self.usuario.login}"
