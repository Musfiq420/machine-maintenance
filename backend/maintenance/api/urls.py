from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BreakdownLogViewSet, MechanicViewSet, MachineViewSet

router = DefaultRouter()
router.register(r'breakdown-logs', BreakdownLogViewSet, basename='breakdownlog')
router.register(r'mechanics', MechanicViewSet, basename='mechanics')
router.register(r'machines', MachineViewSet, basename='machine')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(router.urls)),
]