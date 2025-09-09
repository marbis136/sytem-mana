from django.db import models

# Create your models here.
from django.db import models
from estados.models import EstadoGeneral
from clasificaciones_menu.models import ClasificacionMenu


class SubclasificacionMenu(models.Model):
    name_subclasificacion = models.CharField(max_length=100)
    descripcion = models.TextField(null=True, blank=True)
    clasificacion = models.ForeignKey(ClasificacionMenu, on_delete=models.CASCADE)
    estado = models.ForeignKey(EstadoGeneral, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.name_subclasificacion} ({self.clasificacion.name_clasificacion})"