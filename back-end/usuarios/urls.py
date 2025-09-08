from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterView, UsuarioViewSet

router = DefaultRouter()
router.register(r'', UsuarioViewSet)  # → /api/usuarios/

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('', include(router.urls)),
]
