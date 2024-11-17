from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MechanicViewSet, MachineViewSet, OperatorViewSet, BreakdownLogViewSet

router = DefaultRouter()
router.register(r'mechanics', MechanicViewSet)
router.register(r'machines', MachineViewSet)
router.register(r'operators', OperatorViewSet)
router.register(r'breakdownlogs', BreakdownLogViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),

]
