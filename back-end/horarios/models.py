from django.db import models

# Create your models here.
from django.db import models
from estados.models import EstadoGeneral


class Horario(models.Model):
    nombre_horario = models.CharField(max_length=100)
    hora_entrada = models.TimeField()
    hora_salida = models.TimeField()
    tolerancia_minutos = models.IntegerField(default=0)
    dias_semana = models.CharField(max_length=100)  # Ej: "Lun-Vie"

    estado = models.ForeignKey(EstadoGeneral, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre_horario
