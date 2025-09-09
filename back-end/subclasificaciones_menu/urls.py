from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SubclasificacionMenuViewSet

router = DefaultRouter()
router.register(r'', SubclasificacionMenuViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
