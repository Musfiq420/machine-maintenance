from django.urls import path, include
from rest_framework.routers import DefaultRouter
<<<<<<< HEAD
from .views import EmployeeNameAPIView, UserRegistrationView, EmployeeListAPIView, UserLoginApiView, UserLogoutView, UserListView, DepartmentViewSet, DesignationViewSet, AddEmployeeViewset, DeviceTokenViewSet
=======
from .views import EmployeeNameAPIView, UserRegistrationView, EmployeeListAPIView, UserLoginApiView, UserLogoutView, UserListView, DepartmentViewSet, DesignationViewSet, AddEmployeeViewset, GroupViewSet
>>>>>>> refs/remotes/origin/main

router = DefaultRouter()
router.register(r'department', DepartmentViewSet, basename='department')
router.register(r'designation', DesignationViewSet, basename='designation')
router.register(r'add-employee', AddEmployeeViewset, basename='add-employee')
<<<<<<< HEAD
router.register(r'device-tokens', DeviceTokenViewSet, basename='device-token')
=======
router.register(r'groups', GroupViewSet, basename='group')
>>>>>>> refs/remotes/origin/main

urlpatterns = [
    path('', include(router.urls)),  # Include router URLs
    path('register/', UserRegistrationView.as_view(), name='register'),  # Add a non-viewset view
    path('login/', UserLoginApiView.as_view(), name='login'),
    path('employee-list/', EmployeeListAPIView.as_view(), name='employee-list'),
    path('user-list/', UserListView.as_view(), name='user-list'),
    path('logout/', UserLogoutView.as_view(), name='logout'),
    path('employee-details/', EmployeeNameAPIView.as_view(), name='employee-details'),
]