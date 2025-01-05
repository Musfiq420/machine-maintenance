from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CompanyViewSet, LocationViewSet

router = DefaultRouter()
router.register(r'company', CompanyViewSet, basename='company')
router.register(r'location', LocationViewSet, basename='location')
urlpatterns = [
    path('', include(router.urls)),
]