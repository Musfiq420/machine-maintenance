# from rest_framework import generics, status, viewsets
# from rest_framework.views import APIView
# from rest_framework.viewsets import ModelViewSet
# from rest_framework.response import Response
# from rest_framework.authtoken.models import Token
# from rest_framework.permissions import IsAuthenticated
# from django.contrib.auth import authenticate, login, logout
# from django.contrib.auth.models import User

# from ..models import Employee, Department, Designation
# from .serializers import (UserRegistrationSerializer,UserLoginSerializer, AddEmployeeSerializer)
# from django.urls import reverse
# from django.shortcuts import redirect
# from rest_framework import generics
# from rest_framework.response import Response
# from rest_framework import status
# from .serializers import UserRegistrationSerializer, DepartmentSerializers, DesignationSerializers
# from permissions.base_permissions import IsAdmin, IsHR, IsMechanic, IsSupervisor, IsAdminOrSupervisorOrMechanic, IsAdminOrMechanic, IsAdminOrHR


# class UserRegistrationView(generics.CreateAPIView):
#     # permission_classes = [IsAdminOrHR]
#     serializer_class = UserRegistrationSerializer
#     def create(self, request):
#         serializer = UserRegistrationSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response({"message": "User registered successfully! Please login.", 'redirect_url': "/login/" }, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class AddEmployeeViewset(ModelViewSet):
#     queryset = Employee.objects.all()
#     serializer_class = AddEmployeeSerializer


# class UserLoginApiView(APIView):
#     def post(self, request):
#         serializer = UserLoginSerializer(data=request.data)
#         if serializer.is_valid():
#             email = serializer.validated_data['email']
#             password = serializer.validated_data['password']

#             user = authenticate(username=email, password=password)
#             if user:
#                 token, _ = Token.objects.get_or_create(user=user)
#                 login(request, user)
#                 return Response({
#                     'token': token.key,
#                     'user_id': user.id,
#                     'message': "Login successful. Redirecting to home.",
#                     'redirect_url': "/home/"  # Or the home route on your frontend
#                 }, status=status.HTTP_200_OK)
#             return Response({'error': "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# class UserListView(APIView):
#     # permission_classes = [IsAuthenticated]

#     def get(self, request):
#         users = User.objects.all()
#         # Use a simpler serializer for listing users
#         data = [{"id": user.id, "email": user.email, "username": user.username} for user in users]
#         return Response(data, status=status.HTTP_200_OK)



# class EmployeeListAPIView(APIView):
#     # permission_classes = [IsAuthenticated]

#     def get(self, request):
#         employees = Employee.objects.all()
#         serializer = UserRegistrationSerializer(employees, many=True)
#         return Response(serializer.data)
    
# class UserLogoutView(APIView):
#     def get(self, request):
#         request.user.auth_token.delete()
#         logout(request)
#         return Response({'success': "Logout successful"}, status=status.HTTP_200_OK)

# class EmployeeNameAPIView(APIView):
#     # permission_classes = [IsAuthenticated]

#     def get(self, request):
#         try:
#             # Access the Employee instance associated with the logged-in user
#             employee = request.user.employee
#             # Retrieve the 'name' field
#             return Response({
#                 'name': employee.name,
#                 'designation': employee.designation,
#                 'department': employee.department,
#                 'company': employee.company
#             }, status=status.HTTP_200_OK)
#         except Employee.DoesNotExist:
#             return Response({'error': 'Employee profile not found'}, status=status.HTTP_404_NOT_FOUND)


# class DepartmentViewSet(ModelViewSet):
#     queryset = Department.objects.all()
#     serializer_class = DepartmentSerializers

# class DesignationViewSet(ModelViewSet):
#     queryset = Designation.objects.all()
#     serializer_class = DesignationSerializers

#-------------------------

from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.shortcuts import redirect

from ..models import Employee, Department, Designation
from .serializers import (
    UserRegistrationSerializer,
    UserLoginSerializer,
    AddEmployeeSerializer,
    DepartmentSerializer,
    DesignationSerializer
)
from permissions.base_permissions import (
    IsAdmin, 
    IsHR, 
    IsMechanic, 
    IsSupervisor, 
    IsAdminOrSupervisorOrMechanic, 
    IsAdminOrMechanic, 
    IsAdminOrHR
)


# -----------------------------------------------------
# Registration View
# -----------------------------------------------------
class UserRegistrationView(generics.CreateAPIView):
    # permission_classes = [IsAdminOrHR]
    serializer_class = UserRegistrationSerializer

    def create(self, request, *args, **kwargs):
        """
        Create a new user (and the associated Employee model).
        """
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "message": "User registered successfully! Please login.",
                    "redirect_url": "/login/"
                }, 
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# -----------------------------------------------------
# Add Employee Viewset
# -----------------------------------------------------
class AddEmployeeViewset(ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = AddEmployeeSerializer
    # permission_classes = [IsAdminOrHR, IsAuthenticated]  # Adjust as needed


# -----------------------------------------------------
# Login View
# -----------------------------------------------------
class UserLoginApiView(APIView):
    # permission_classes = [AllowAny]  # Adjust as needed

    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']

            user = authenticate(username=email, password=password)
            if user:
                token, _ = Token.objects.get_or_create(user=user)
                login(request, user)
                return Response(
                    {
                        'token': token.key,
                        'user_id': user.id,
                        'message': "Login successful. Redirecting to home.",
                        'redirect_url': "/home/"
                    }, 
                    status=status.HTTP_200_OK
                )
            return Response(
                {'error': "Invalid credentials"}, 
                status=status.HTTP_401_UNAUTHORIZED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# -----------------------------------------------------
# List All Users
# -----------------------------------------------------
class UserListView(APIView):
    # permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        Retrieve a list of all Users in the system.
        """
        users = User.objects.all()
        data = [
            {"id": user.id, "email": user.email, "username": user.username}
            for user in users
        ]
        return Response(data, status=status.HTTP_200_OK)


# -----------------------------------------------------
# List All Employees
# -----------------------------------------------------
class EmployeeListAPIView(APIView):
    # permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        Retrieve a list of all Employees.
        """
        employees = Employee.objects.all()
        # Reuse the UserRegistrationSerializer just for demonstration:
        # In many cases, you'd use a simpler read-only Employee serializer.
        serializer = UserRegistrationSerializer(employees, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


# -----------------------------------------------------
# Logout View
# -----------------------------------------------------
class UserLogoutView(APIView):
    # permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        Logs out the current user by deleting their auth token.
        """
        request.user.auth_token.delete()
        logout(request)
        return Response({'success': "Logout successful"}, status=status.HTTP_200_OK)


# -----------------------------------------------------
# Employee Name & Basic Info View
# -----------------------------------------------------
class EmployeeNameAPIView(APIView):
    # permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        Retrieves the currently logged-in user's Employee profile
        (name, designation, department, company).
        """
        try:
            employee = request.user.employee
            return Response({
                'name': employee.name,
                'designation': employee.designation.title if employee.designation else None,
                'department': employee.department.name if employee.department else None,
                'company': employee.company.name if employee.company else None
            }, status=status.HTTP_200_OK)
        except Employee.DoesNotExist:
            return Response({'error': 'Employee profile not found'}, status=status.HTTP_404_NOT_FOUND)


# -----------------------------------------------------
# Department CRUD ViewSet
# -----------------------------------------------------
class DepartmentViewSet(ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    # permission_classes = [IsAdminOrHR, IsAuthenticated]  # Adjust as needed


# -----------------------------------------------------
# Designation CRUD ViewSet
# -----------------------------------------------------
class DesignationViewSet(ModelViewSet):
    queryset = Designation.objects.all()
    serializer_class = DesignationSerializer
    # permission_classes = [IsAdminOrHR, IsAuthenticated]  # Adjust as needed
