from django.db import models

# Create your models here.
from django.db import models
from estados.models import EstadoGeneral
from clientes.models import Cliente
from promociones.models import Promocion


class Puntos(models.Model):
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    monto_compra = models.DecimalField(max_digits=10, decimal_places=2)
    porcentaje_puntos = models.DecimalField(max_digits=5, decimal_places=2)
    promocion = models.ForeignKey(Promocion, on_delete=models.SET_NULL, null=True, blank=True)
    estado = models.ForeignKey(EstadoGeneral, on_delete=models.CASCADE)

    def __str__(self):
        return f"Puntos {self.id} - Cliente {self.cliente.name_cliente}"
