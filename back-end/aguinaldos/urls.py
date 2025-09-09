from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AguinaldoViewSet

router = DefaultRouter()
router.register(r'', AguinaldoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
