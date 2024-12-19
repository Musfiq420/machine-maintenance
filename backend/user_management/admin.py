from django.contrib import admin
from .models import Employee

class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('name', 'company', 'department', 'mobile', 'designation', 'employee_id', 'date_of_joining')
    search_fields = ('name', 'company', 'department', 'employee_id')
    list_filter = ('company', 'department', 'designation', 'date_of_joining')

admin.site.register(Employee, EmployeeAdmin)