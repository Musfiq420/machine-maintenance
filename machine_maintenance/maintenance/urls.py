from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BreakdownLogViewSet
from .views import BreakdownLogViewSet

router = DefaultRouter()
router.register(r'breakdown-logs', BreakdownLogViewSet, basename='breakdownlog')
router.register(r'mechanics', BreakdownLogViewSet, basename='mechanics')

urlpatterns = [
    path('', include(router.urls)),
]