from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CierreVentaViewSet

router = DefaultRouter()
router.register(r'', CierreVentaViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
