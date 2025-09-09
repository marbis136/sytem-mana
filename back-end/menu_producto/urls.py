from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MenuProductoViewSet

router = DefaultRouter()
router.register(r'', MenuProductoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
