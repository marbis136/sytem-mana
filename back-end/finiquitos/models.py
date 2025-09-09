from django.db import models

# Create your models here.
from django.db import models
from contratos.models import Contrato
from estados.models import EstadoGeneral


class Finiquito(models.Model):
    contrato = models.ForeignKey(Contrato, on_delete=models.CASCADE)
    fecha_pago_ini = models.DateField()
    fecha_pago_fin = models.DateField()
    fecha_pago_finiquito = models.DateField()

    estado = models.ForeignKey(EstadoGeneral, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Finiquito {self.id} - Contrato {self.contrato.id}"
