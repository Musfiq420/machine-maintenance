from rest_framework import generics, status, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User

from ..models import Employee
from .serializers import (UserRegistrationSerializer,UserLoginSerializer)

from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserRegistrationSerializer

class UserRegistrationView(generics.CreateAPIView):
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


class UserLogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.user.auth_token.delete()
        logout(request)
        return Response({'success': "Logout successful"}, status=status.HTTP_200_OK)



class UserListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        users = User.objects.all()
        # Use a simpler serializer for listing users
        data = [{"id": user.id, "email": user.email, "username": user.username} for user in users]
        return Response(data, status=status.HTTP_200_OK)



class EmployeeListAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        employees = Employee.objects.all()
        serializer = UserRegistrationSerializer(employees, many=True)
        return Response(serializer.data)