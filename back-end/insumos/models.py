from django.db import models

# Create your models here.
from django.db import models
from estados.models import EstadoGeneral
from proveedores.models import Proveedor
from almacenes.models import Almacen


class Insumo(models.Model):
    nombre_insumo = models.CharField(max_length=100, unique=True)
    descripcion = models.TextField(null=True, blank=True)
    cantidad = models.IntegerField(default=0)
    unidad_medida = models.CharField(max_length=50)
    costo = models.DecimalField(max_digits=10, decimal_places=2)

    estado = models.ForeignKey(EstadoGeneral, on_delete=models.CASCADE)
    proveedor = models.ForeignKey(Proveedor, on_delete=models.CASCADE)
    almacen = models.ForeignKey(Almacen, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre_insumo
