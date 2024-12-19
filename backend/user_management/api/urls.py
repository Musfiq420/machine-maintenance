from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EmployeeViewSet, UserRegistrationView

router = DefaultRouter()
router.register(r'employees', EmployeeViewSet, basename='employee')

urlpatterns = [
    path('', include(router.urls)),  # Include router URLs
    path('register/', UserRegistrationView.as_view(), name='user-registration'),  # Add a non-viewset view
]
