from django.db import models

# Create your models here.
from django.db import models
from estados.models import EstadoGeneral
from sucursal.models import Sucursal
from subclasificaciones_menu.models import SubclasificacionMenu


class Menu(models.Model):
    nombre_menu = models.CharField(max_length=100)
    descripcion = models.TextField(null=True, blank=True)
    sucursal = models.ForeignKey(Sucursal, on_delete=models.CASCADE)
    estado = models.ForeignKey(EstadoGeneral, on_delete=models.CASCADE)
    subclasificacion = models.ForeignKey(
        SubclasificacionMenu,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ("nombre_menu", "sucursal")

    def __str__(self):
        return f"{self.nombre_menu} - {self.sucursal.nombre_sucursal}"
