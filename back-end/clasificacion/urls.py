from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ClasificacionProductoViewSet

router = DefaultRouter()
router.register(r'', ClasificacionProductoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
