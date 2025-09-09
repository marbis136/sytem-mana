from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

urlpatterns = [
    path('admin/', admin.site.urls),

    # 🔑 Autenticación JWT
    path('api/auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/auth/verify/', TokenVerifyView.as_view(), name='token_verify'),

    # Usuarios
    path('api/usuarios/', include('usuarios.urls')),

    # Roles
    path('api/roles/', include('roles.urls')),

    # Estados
    path('api/estados/', include('estados.urls')),

    # Sucursal / Almacenes
    path('api/sucursales/', include('sucursal.urls')),
    path('api/tipos-almacen/', include('tipo_almacen.urls')),
    path('api/almacenes/', include('almacenes.urls')),

    # RRHH
    path('api/personal/', include('personal.urls')),
    path('api/contratos/', include('contratos.urls')),
    path('api/aguinaldos/', include('aguinaldos.urls')),
    path('api/finiquitos/', include('finiquitos.urls')),
    path('api/horarios/', include('horarios.urls')),
    path('api/asistencias/', include('asistencias.urls')),

    # Inventario / Productos
    path('api/clasificaciones/', include('clasificacion.urls')),
    path('api/subclasificaciones/', include('subclasificaciones.urls')),
    path('api/proveedores/', include('proveedores.urls')),
    path('api/insumos/', include('insumos.urls')),
    path('api/productos/', include('productos.urls')),
    path('api/precios-productos/', include('precios_productos.urls')),

    # Menús
    path('api/menu/', include('menu.urls')),
    path('api/menu-producto/', include('menu_producto.urls')),
    path('api/menu-precio/', include('menu_precio.urls')),
    path('api/menu-clasificaciones/', include('clasificaciones_menu.urls')),
    path('api/menu-subclasificaciones/', include('subclasificaciones_menu.urls')),

    # Clientes y Ventas
    path('api/clientes/', include('clientes.urls')),
    path('api/promociones/', include('promociones.urls')),
    path('api/cupones/', include('cupones.urls')),
    path('api/puntos/', include('puntos.urls')),
    path('api/cierres/', include('cierres.urls')),
    path('api/ventas/', include('ventas.urls')),
    path('api/facturas/', include('facturas.urls')),
]
