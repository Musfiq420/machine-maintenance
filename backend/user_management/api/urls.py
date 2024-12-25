from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EmployeeViewSet, UserRegistrationView, EmployeeListView, UserLoginApiView, UserLogoutView

router = DefaultRouter()
router.register(r'employees', EmployeeViewSet, basename='employee')

urlpatterns = [
    path('', include(router.urls)),  # Include router URLs
    path('register/', UserRegistrationView.as_view(), name='register'),  # Add a non-viewset view
    path('login/', UserLoginApiView.as_view(), name='login'),
    path('employee-list/', EmployeeListView.as_view(), name='employee-list'),
    path('logout/', UserLogoutView.as_view(), name='logout'),
]
