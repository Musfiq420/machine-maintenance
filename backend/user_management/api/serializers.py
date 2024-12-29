from django.contrib.auth.models import User
from rest_framework import serializers

from ..models import Employee

class UserRegistrationSerializer(serializers.ModelSerializer):

    confirm_password = serializers.CharField(required=True)
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
        # Ensure passwords match
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError({"password": "Passwords do not match."})
        # Ensure email is unique
        if User.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError({'email': "Email already exists"})
        return data
    
    def save(self):
        # Extract data
        name = self.validated_data['name']
        company = self.validated_data['company']
        department = self.validated_data['department']
        mobile = self.validated_data['mobile']
        designation = self.validated_data['designation']
        employee_id = self.validated_data['employee_id']
        date_of_joining = self.validated_data['date_of_joining']
        assigned_line = self.validated_data['assigned_line']
        assigned_block = self.validated_data['assigned_block']
        email = self.validated_data['email']
        password = self.validated_data['password']
        
        # Create User object (password will be hashed automatically)
        user = User(username=email, email=email)
        user.set_password(password)
        user.save()

        # Create Employee object (no password field here)
        employee = Employee(
            user=user,
            name=name,
            company=company,
            department=department,
            mobile=mobile,
            designation=designation,
            employee_id=employee_id,
            date_of_joining=date_of_joining,
            assigned_line=assigned_line,
            assigned_block=assigned_block
        )
        employee.save()

        return employee


    # def create(self, validated_data):
    #     # Remove confirm_password from validated_data
    #     validated_data.pop('confirm_password')

    #     # Create the user
    #     user = User.objects.create_user(
    #         username=validated_data['email'],  # Use email as the username
    #         email=validated_data['email'],
    #         password=validated_data['password']  # Password will be hashed automatically
    #     )

    #     # Create the employee
    #     employee_data = {
    #         field: validated_data[field]
    #         for field in ['name', 'company', 'department', 'mobile', 'designation',
    #                       'employee_id', 'date_of_joining', 'assigned_line', 'assigned_block']
    #     }
    #     employee = Employee.objects.create(user=user, **employee_data)

    #     return employee


class EmployeeSerializer(serializers.ModelSerializer):
    user_email = serializers.SerializerMethodField()

    class Meta:
        model = Employee
        fields = [
            'id', 'name', 'company', 'department', 'mobile', 'designation',
            'employee_id', 'date_of_joining', 'assigned_line', 'assigned_block', 'user_email'
        ]

    def get_user_email(self, obj):
        # Return the email of the associated user
        if obj.user:
            return obj.user.email
        return None  # Or return "N/A" for employees without a linked user


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True)
