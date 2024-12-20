from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EmployeeViewSet, UserRegistrationView, UserListView, EmployeeListView

router = DefaultRouter()
router.register(r'employees', EmployeeViewSet, basename='employee')

urlpatterns = [
    path('', include(router.urls)),  # Include router URLs
    path('register/', UserRegistrationView.as_view(), name='user-registration'),  # Add a non-viewset view
    path('users/', UserListView.as_view(), name='user-list'),  # Fetch all users
    path('employee-list/', EmployeeListView.as_view(), name='employee-list'),
]
