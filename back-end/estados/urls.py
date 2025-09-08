from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EstadoGeneralViewSet

router = DefaultRouter()
router.register(r'', EstadoGeneralViewSet)  # → /api/estados/

urlpatterns = [
    path('', include(router.urls)),
]
