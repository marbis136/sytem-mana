from django.db import models

# Create your models here.
from django.db import models
from ventas.models import Venta
from usuarios.models import Usuario
from sucursal.models import Sucursal
from estados.models import EstadoGeneral


class Factura(models.Model):
    venta = models.ForeignKey(Venta, on_delete=models.CASCADE)
    fecha = models.DateField()
    tipo_documento_sector = models.CharField(max_length=50)
    numero_factura = models.CharField(max_length=50, unique=True)
    cuf = models.CharField(max_length=100, unique=True)
    sucursal = models.ForeignKey(Sucursal, on_delete=models.CASCADE)
    punto_venta = models.IntegerField()
    estado = models.ForeignKey(EstadoGeneral, on_delete=models.CASCADE)

    numero_documento = models.CharField(max_length=50)
    complemento = models.CharField(max_length=50, null=True, blank=True)
    nombre_cliente = models.CharField(max_length=100)

    monto_venta = models.DecimalField(max_digits=10, decimal_places=2)
    detalle_venta = models.TextField(null=True, blank=True)

    ICE = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    IEHD = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    JPJ = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    tasas = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    otros_NSCF = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    exentos = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    tasa_cero = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    gift_card = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    ajuste_iva = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    iva = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    autorizacion_contingencia = models.CharField(max_length=100, null=True, blank=True)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    tipo_emision = models.CharField(max_length=50)
    observacion = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"Factura {self.numero_factura} - {self.nombre_cliente}"
