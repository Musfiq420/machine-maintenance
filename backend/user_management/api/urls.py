from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserRegistrationView, EmployeeListAPIView, UserLoginApiView, UserLogoutView, UserListView

router = DefaultRouter()


urlpatterns = [
    path('', include(router.urls)),  # Include router URLs
    path('register/', UserRegistrationView.as_view(), name='register'),  # Add a non-viewset view
    path('login/', UserLoginApiView.as_view(), name='login'),
    path('employee-list/', EmployeeListAPIView.as_view(), name='employee-list'),
    path('userlist/', UserListView.as_view(), name='employee-list'),
    path('logout/', UserLogoutView.as_view(), name='logout'),
]