from django.db import models
from django.contrib.auth.models import User

class Employee(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    name = models.CharField(max_length=50)
    company = models.CharField(max_length=50, null=True, blank=True)
    department = models.CharField(max_length=50, null=True, blank=True)
    mobile = models.CharField(max_length=11, null=True, blank=True)
    designation = models.CharField(max_length=255)
    employee_id = models.CharField(max_length=20, null=True, blank=True)
    date_of_joining = models.DateField(null=True, blank=True)
    assigned_line = models.IntegerField()
    assigned_block = models.IntegerField()

    def __str__(self):
        return self.name or "Unnamed Employee"