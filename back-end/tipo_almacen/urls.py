from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TipoAlmacenViewSet

router = DefaultRouter()
router.register(r'', TipoAlmacenViewSet)  # → /api/tipos-almacen/

urlpatterns = [
    path('', include(router.urls)),
]
