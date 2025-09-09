from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PromocionViewSet

router = DefaultRouter()
router.register(r'', PromocionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
