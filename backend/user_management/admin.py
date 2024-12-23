from django.contrib import admin
from .models import Employee

class EmployeeAdmin(admin.ModelAdmin):
    list_display = (
        'name', 
        'get_user_email', 
        'company', 
        'department', 
        'mobile', 
        'designation', 
        'employee_id', 
        'date_of_joining'
    )

    def get_user_email(self, obj):
        if obj.user:
            return obj.user.email or obj.user.username  # Prefer email, fallback to username
        return "No User"  # Default for employees without a user
    get_user_email.short_description = 'User Email/Username'  # Column header in admin

admin.site.register(Employee, EmployeeAdmin)
