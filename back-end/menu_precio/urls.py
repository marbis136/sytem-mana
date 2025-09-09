from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MenuPrecioViewSet

router = DefaultRouter()
router.register(r'', MenuPrecioViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
