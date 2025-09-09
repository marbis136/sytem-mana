from django.db import models

# Create your models here.
from django.db import models
from estados.models import EstadoGeneral
from clasificacion.models import ClasificacionProducto   # ajusta la ruta según tu estructura


class SubclasificacionProducto(models.Model):
    name_subclasificacion = models.CharField(max_length=100, unique=True)
    descripcion = models.TextField(null=True, blank=True)
    estado = models.ForeignKey(EstadoGeneral, on_delete=models.CASCADE)
    clasificacion = models.ForeignKey(ClasificacionProducto, on_delete=models.CASCADE)

    def __str__(self):
        return self.name_subclasificacion
