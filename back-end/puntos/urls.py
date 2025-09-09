from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PuntosViewSet

router = DefaultRouter()
router.register(r'', PuntosViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
