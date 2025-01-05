from django.db import models
from user_management.models import Employee
from company.models import Company, Location
from django.db import models

class Brand(models.Model):
    name = models.CharField(max_length = 30)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    def __str__(self):
        return self.name
    
class Category(models.Model):
    name = models.CharField(max_length = 30)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    def __str__(self):
        return self.name
    
class Type(models.Model):
    name = models.CharField(max_length = 30)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    def __str__(self):
        return self.name

class Supplier(models.Model):
    name = models.CharField(max_length = 30)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    def __str__(self):
        return self.name
    


class Machine(models.Model):
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('inactive', 'Inactive'),
        ('maintenance', 'Under Maintenance'),
        ('broken', 'Broken'),
    ]

    machine_id = models.CharField(max_length=255, unique=True)  # Add MachineID as the primary key
    category = models.ForeignKey(Category, on_delete=models.CASCADE, blank=True, null=True)
    type = models.ForeignKey(Type, on_delete=models.CASCADE, blank=True, null=True)
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, blank=True, null=True)
    model_number = models.CharField(max_length=255, blank=True, null=True)
    serial_no = models.CharField(max_length=255, blank=True, null=True)
    location = models.ForeignKey(Location, on_delete=models.CASCADE, blank=True, null=True)
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE,blank=True, null=True)
    purchase_date = models.DateField(blank=True, null=True)
    last_breakdown_start = models.DateTimeField(blank=True, null=True)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='active')

    def __str__(self):
        return f"{self.category} ({self.model_number})"



class BreakdownLog(models.Model):
    machine = models.ForeignKey(Machine, on_delete=models.CASCADE, related_name="machine_breakdowns")
    mechanic = models.ForeignKey(Employee, on_delete=models.SET_NULL, null=True, related_name="mechanic_breakdowns")
    operator = models.ForeignKey(Employee, on_delete=models.SET_NULL, null=True, related_name="operator_breakdowns")
    problem_category = models.CharField(max_length=255)
    breakdown_start = models.DateTimeField()
    lost_time = models.DurationField()
    comments = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Breakdown for {self.machine.category} on {self.breakdown_start}"

    class Meta:
        verbose_name = "Breakdown Log"
        verbose_name_plural = "Breakdown Logs"
        ordering = ["-breakdown_start"]