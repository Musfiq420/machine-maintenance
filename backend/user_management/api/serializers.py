from django.contrib.auth.models import User
from rest_framework import serializers
from ..models import Employee

class UserRegistrationSerializer(serializers.ModelSerializer):
    # Add extra fields for password and confirm password
    confirm_password = serializers.CharField(write_only=True)
    name = serializers.CharField()
    company = serializers.CharField()
    department = serializers.CharField()
    mobile = serializers.CharField()
    designation = serializers.CharField()
    employee_id = serializers.CharField()
    date_of_joining = serializers.DateField()
    assigned_line = serializers.IntegerField()
    assigned_block = serializers.IntegerField()

    class Meta:
        model = User
        fields = [
            'name', 'company', 'department', 'mobile', 'designation',
            'employee_id', 'date_of_joining', 'assigned_line', 'assigned_block',
            'email', 'password', 'confirm_password'
        ]

    def validate(self, data):
        # Check if passwords match
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError({"password": "Passwords do not match."})
        return data

    def create(self, validated_data):
        # Remove confirm_password from validated_data
        validated_data.pop('confirm_password')

        # Create the user
        user = User.objects.create_user(
            username=validated_data['email'],  # Use email as the username
            email=validated_data['email'],
            password=validated_data['password']
        )

        # Create the employee
        employee_data = {
            field: validated_data[field]
            for field in ['name', 'company', 'department', 'mobile', 'designation',
                          'employee_id', 'date_of_joining', 'assigned_line', 'assigned_block']
        }
        employee = Employee.objects.create(user=user, **employee_data)

        return employee

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'
