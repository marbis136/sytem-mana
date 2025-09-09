from django.db import models

# Create your models here.
from django.db import models
from productos.models import Producto
from estados.models import EstadoGeneral


class PreciosProducto(models.Model):
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    nombre_precio = models.CharField(max_length=50)
    valor = models.DecimalField(max_digits=10, decimal_places=2)

    estado = models.ForeignKey(EstadoGeneral, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.nombre_precio} - {self.producto.name_producto}"
