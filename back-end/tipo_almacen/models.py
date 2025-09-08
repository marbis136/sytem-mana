from django.db import models

# Create your models here.
from django.db import models
from estados.models import EstadoGeneral   # ajusta la ruta según tu estructura

class TipoAlmacen(models.Model):
    tipo_almacen = models.CharField(max_length=100, unique=True)
    ubicacion = models.CharField(max_length=255, blank=True, null=True)
    estado = models.ForeignKey(EstadoGeneral, on_delete=models.CASCADE)

    def __str__(self):
        return self.tipo_almacen
