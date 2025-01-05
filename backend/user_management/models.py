from django.db import models
from django.contrib.auth.models import User
from company.models import Company

DESIGNATION_CHOICES = (
        ('admin', 'Admin'),
        ('mechanic', 'Mechanic'),
        ('supervisor', 'Supervisor'),
        ('hr', 'HR'),
    )


class Employee(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='employee', null=True, blank=True)
    name = models.CharField(max_length=50)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, null=True, blank=True)
    department = models.CharField(max_length=50, null=True, blank=True)
    mobile = models.CharField(max_length=11, null=True, blank=True)
    designation = models.CharField(max_length=50, choices=DESIGNATION_CHOICES)
    employee_id = models.CharField(max_length=20, null=True, blank=True)
    date_of_joining = models.DateField(null=True, blank=True)
    assigned_line = models.IntegerField()
    assigned_block = models.IntegerField()

    def __str__(self):
        return f"{self.name} - {self.designation}"