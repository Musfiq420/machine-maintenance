from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BreakdownLogViewSet, MechanicViewSet, MachineViewSet, TypeViewSet, SupplierViewSet, CategoryViewSet, BrandViewSet, LocationViewSet

router = DefaultRouter()
router.register(r'breakdown-logs', BreakdownLogViewSet, basename='breakdownlog')
router.register(r'mechanics', MechanicViewSet, basename='mechanics')
router.register(r'machines', MachineViewSet, basename='machine')
router.register(r'location', LocationViewSet, basename='location')
router.register(r'brand', BrandViewSet, basename='brand')
router.register(r'supplier', SupplierViewSet, basename='supplier')
router.register(r'category', CategoryViewSet, basename='category')
router.register(r'type', TypeViewSet, basename='type')

urlpatterns = [
    path('', include(router.urls)),
]