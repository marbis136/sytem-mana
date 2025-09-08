from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AlmacenViewSet

router = DefaultRouter()
router.register(r'', AlmacenViewSet)  # → /api/almacenes/

urlpatterns = [
    path('', include(router.urls)),
]
