from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    # Usuarios (registro + API)
    path('api/usuarios/', include('usuarios.urls')),

    path('api/auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/auth/verify/', TokenVerifyView.as_view(), name='token_verify'),

    # Estado General
    path('api/estados/', include('estados.urls')),

    # Tipo de Almacén
    path('api/tipos-almacen/', include('tipo_almacen.urls')),

    # Almacenes
    path('api/almacenes/', include('almacenes.urls')),

    # Roles de usuario
    path('api/roles/', include('roles.urls')),

    # Sucursal
    path('api/sucursales/', include('sucursal.urls')),
]
