from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FacturaViewSet

router = DefaultRouter()
router.register(r'', FacturaViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
