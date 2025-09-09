from django.contrib import admin

# Register your models here.
from .models import Sucursal

@admin.register(Sucursal)
class SucursalAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre_sucursal', 'ciudad', 'ubicacion', 'estado')
    search_fields = ('nombre_sucursal', 'ciudad')
    list_filter = ('estado',)
