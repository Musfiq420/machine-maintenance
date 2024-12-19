from rest_framework import generics
from rest_framework.viewsets import ModelViewSet
from ..models import Employee
from .serializers import EmployeeSerializer, UserRegistrationSerializer

class UserRegistrationView(generics.CreateAPIView):
    serializer_class = UserRegistrationSerializer

class EmployeeViewSet(ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
