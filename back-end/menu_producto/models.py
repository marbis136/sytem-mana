from django.db import models

# Create your models here.
from django.db import models
from productos.models import Producto
from menu.models import Menu


class MenuProducto(models.Model):
    menu = models.ForeignKey(Menu, on_delete=models.CASCADE, related_name="ingredientes")
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.DecimalField(max_digits=10, decimal_places=2)
    unidad = models.CharField(max_length=50)  # gramos, litros, unidades

    def __str__(self):
        return f"{self.menu.nombre_menu} - {self.producto.name_producto}"
