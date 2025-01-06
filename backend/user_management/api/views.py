from rest_framework import generics, status, viewsets
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User

from ..models import Employee, Department, Designation
from .serializers import (UserRegistrationSerializer,UserLoginSerializer)
from django.urls import reverse
from django.shortcuts import redirect
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserRegistrationSerializer, DepartmentSerializers, DesignationSerializers
from permissions.base_permissions import IsAdmin, IsHR, IsMechanic, IsSupervisor, IsAdminOrSupervisorOrMechanic, IsAdminOrMechanic, IsAdminOrHR


class UserRegistrationView(generics.CreateAPIView):
    # permission_classes = [IsAdminOrHR]
    serializer_class = UserRegistrationSerializer
    def create(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered successfully! Please login.", 'redirect_url': "/login/" }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLoginApiView(APIView):
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']

            user = authenticate(username=email, password=password)
            if user:
                token, _ = Token.objects.get_or_create(user=user)
                login(request, user)
                return Response({
                    'token': token.key,
                    'user_id': user.id,
                    'message': "Login successful. Redirecting to home.",
                    'redirect_url': "/home/"  # Or the home route on your frontend
                }, status=status.HTTP_200_OK)
            return Response({'error': "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class UserListView(APIView):
    # permission_classes = [IsAuthenticated]

    def get(self, request):
        users = User.objects.all()
        # Use a simpler serializer for listing users
        data = [{"id": user.id, "email": user.email, "username": user.username} for user in users]
        return Response(data, status=status.HTTP_200_OK)



class EmployeeListAPIView(APIView):
    # permission_classes = [IsAuthenticated]

    def get(self, request):
        employees = Employee.objects.all()
        serializer = UserRegistrationSerializer(employees, many=True)
        return Response(serializer.data)
    
class UserLogoutView(APIView):
    def get(self, request):
        request.user.auth_token.delete()
        logout(request)
        return Response({'success': "Logout successful"}, status=status.HTTP_200_OK)

class EmployeeNameAPIView(APIView):
    # permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            # Access the Employee instance associated with the logged-in user
            employee = request.user.employee
            # Retrieve the 'name' field
            return Response({
                'name': employee.name,
                'designation': employee.designation,
                'department': employee.department,
                'company': employee.company
            }, status=status.HTTP_200_OK)
        except Employee.DoesNotExist:
            return Response({'error': 'Employee profile not found'}, status=status.HTTP_404_NOT_FOUND)


class DepartmentViewSet(ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializers

class DesignationViewSet(ModelViewSet):
    queryset = Designation.objects.all()
    serializer_class = DesignationSerializers