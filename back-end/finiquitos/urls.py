from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FiniquitoViewSet

router = DefaultRouter()
router.register(r'', FiniquitoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
