from django.db import models

# Create your models here.
from django.db import models
from estados.models import EstadoGeneral
from insumos.models import Insumo
from subclasificaciones.models import SubclasificacionProducto


class Producto(models.Model):
    codigo_producto = models.CharField(max_length=50, unique=True)
    name_producto = models.CharField(max_length=100)
    nombre_comercial = models.CharField(max_length=100, null=True, blank=True)
    codigo_barras = models.CharField(max_length=50, null=True, blank=True)
    descripcion = models.TextField(null=True, blank=True)
    marca = models.CharField(max_length=50, null=True, blank=True)
    unidad_venta = models.CharField(max_length=50)
    unidad_compra = models.CharField(max_length=50)
    equivalencia = models.IntegerField(default=1)
    costo = models.DecimalField(max_digits=10, decimal_places=2)
    cantidad = models.IntegerField(default=0)
    impresora = models.CharField(max_length=50, null=True, blank=True)

    estado = models.ForeignKey(EstadoGeneral, on_delete=models.CASCADE)
    insumo = models.ForeignKey(Insumo, on_delete=models.CASCADE, null=True, blank=True)
    subclasificacion = models.ForeignKey(SubclasificacionProducto, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.name_producto
