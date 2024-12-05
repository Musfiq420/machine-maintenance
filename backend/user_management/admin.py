from django.contrib import admin
from .models import Employee

class EmployeeAdmin(admin.ModelAdmin):
    # Display fields in the list view
    list_display = ('name', 'designation', 'assigned_line', 'assigned_block')
    
    # Add search functionality
    search_fields = ('name', 'designation')
    
    # Add filter options
    list_filter = ('assigned_line', 'assigned_block')
    
    # Add ordering for the list view
    ordering = ('name',)

    # Add fields to display in the detail view
    fields = ('name', 'designation', 'assigned_line', 'assigned_block')

    # Make the assigned_line and assigned_block fields read-only
    readonly_fields = ('assigned_line', 'assigned_block')

# Register the Employee model with its custom EmployeeAdmin
admin.site.register(Employee, EmployeeAdmin)
