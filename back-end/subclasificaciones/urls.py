from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SubclasificacionProductoViewSet

router = DefaultRouter()
router.register(r'', SubclasificacionProductoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
