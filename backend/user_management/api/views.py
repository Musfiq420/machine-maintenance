from rest_framework import generics, status, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User

from ..models import Employee
from .serializers import (EmployeeSerializer,UserRegistrationSerializer,UserLoginSerializer)

class UserRegistrationView(generics.CreateAPIView):
    serializer_class = UserRegistrationSerializer

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        # Add a redirect URL to the response
        response.data['message'] = "Registration successful. Please log in."
        response.data['redirect_url'] = "/login/"  # Or the login route on your frontend
        return response


class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    permission_classes = [IsAuthenticated]  # Ensure only authenticated users can access


class UserListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        users = User.objects.all()
        # Use a simpler serializer for listing users
        data = [{"id": user.id, "email": user.email, "username": user.username} for user in users]
        return Response(data, status=status.HTTP_200_OK)


class EmployeeListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        employees = Employee.objects.all()
        serializer = EmployeeSerializer(employees, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


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
                    'redirect_url': "/"  # Or the home route on your frontend
                }, status=status.HTTP_200_OK)
            return Response({'error': "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.user.auth_token.delete()
        logout(request)
        return Response({'success': "Logout successful"}, status=status.HTTP_200_OK)
