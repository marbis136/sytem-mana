from django.db import models

# Create your models here.
from django.db import models
from estados.models import EstadoGeneral
from tipo_almacen.models import TipoAlmacen
from sucursal.models import Sucursal   # ajusta la ruta según tu proyecto

class Almacen(models.Model):
    nombre_almacen = models.CharField(max_length=100, unique=True)
    descripcion_almacen = models.TextField(blank=True, null=True)
    estado = models.ForeignKey(EstadoGeneral, on_delete=models.CASCADE)
    tipo_almacen = models.ForeignKey(TipoAlmacen, on_delete=models.CASCADE)
    sucursal = models.ForeignKey(Sucursal, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre_almacen
