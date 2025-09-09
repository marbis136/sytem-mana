from django.db import models

# Create your models here.
from django.db import models
from estados.models import EstadoGeneral
from menu.models import Menu


class MenuPrecio(models.Model):
    menu = models.ForeignKey(Menu, on_delete=models.CASCADE, related_name="precios")
    nombre_precio = models.CharField(max_length=50)  # Normal, Combo, Promoción
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    estado = models.ForeignKey(EstadoGeneral, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.nombre_precio} - {self.menu.nombre_menu}: {self.valor}"
