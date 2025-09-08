from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RolUsuarioViewSet

router = DefaultRouter()
router.register(r'', RolUsuarioViewSet)  # → /api/roles/

urlpatterns = [
    path('', include(router.urls)),
]
