from django.db import models

# Create your models here.
from django.db import models

class EstadoGeneral(models.Model):
    nombre_estado = models.CharField(max_length=50, unique=True)
    descripcion = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.nombre_estado
