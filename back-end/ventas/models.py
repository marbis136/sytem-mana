from django.db import models

# Create your models here.
from django.db import models
from usuarios.models import Usuario
from sucursal.models import Sucursal
from clientes.models import Cliente
from promociones.models import Promocion
from cupones.models import Cupon
from cierres.models import CierreVenta
from estados.models import EstadoGeneral


class Venta(models.Model):
    codigo_venta = models.CharField(max_length=50, unique=True)
    fecha_hora_venta = models.DateTimeField()
    descripcion_venta = models.TextField(null=True, blank=True)
    total_venta = models.DecimalField(max_digits=10, decimal_places=2)
    total_neto = models.DecimalField(max_digits=10, decimal_places=2)
    observaciones = models.TextField(null=True, blank=True)
    tipo_venta = models.CharField(max_length=50)  # contado, crédito
    forma_pago = models.CharField(max_length=50)  # efectivo, tarjeta, etc.

    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    sucursal = models.ForeignKey(Sucursal, on_delete=models.CASCADE)
    cliente = models.ForeignKey(Cliente, on_delete=models.SET_NULL, null=True, blank=True)
    promocion = models.ForeignKey(Promocion, on_delete=models.SET_NULL, null=True, blank=True)
    cupon = models.ForeignKey(Cupon, on_delete=models.SET_NULL, null=True, blank=True)
    cierre = models.ForeignKey(CierreVenta, on_delete=models.SET_NULL, null=True, blank=True)
    estado = models.ForeignKey(EstadoGeneral, on_delete=models.CASCADE)

    def __str__(self):
        return f"Venta {self.codigo_venta} - {self.total_venta}"
