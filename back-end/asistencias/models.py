from django.db import models

# Create your models here.
from django.db import models
from personal.models import Personal
from horarios.models import Horario


class Asistencia(models.Model):
    personal = models.ForeignKey(Personal, on_delete=models.CASCADE)
    horario = models.ForeignKey(Horario, on_delete=models.CASCADE)
    fecha = models.DateField()
    hora_entrada = models.TimeField(null=True, blank=True)
    hora_salida = models.TimeField(null=True, blank=True)
    tipo_asistencia = models.CharField(max_length=50)  # Ej: Normal, Retraso, Falta
    observacion = models.TextField(null=True, blank=True)
    verificado_biometrico = models.BooleanField(default=False)

    def __str__(self):
        return f"Asistencia {self.personal.nombre} - {self.fecha}"
