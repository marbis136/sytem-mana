from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ClasificacionMenuViewSet

router = DefaultRouter()
router.register(r'', ClasificacionMenuViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
