from django.db import models
from datetime import date

# Create your models here.
class Company(models.Model):
    name = models.CharField(max_length=50, blank=True, null=True)
    industry_type = models.CharField(max_length=100, default='RMG', choices=[('RMG', 'Ready-Made Garments'), ('Textiles', 'Textiles'), ('Other', 'Other')])
    about = models.TextField(blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    contacts = models.TextField(blank=True, null=True)
    email = models.EmailField(unique=True, blank=True, null=True)
    website = models.URLField(blank=True, null=True)
    created_at = models.DateField(default=date.today)
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name


class Location(models.Model):
    desk = models.CharField(max_length = 30,blank=True, null=True)
    floor_no = models.CharField(max_length=50,blank=True, null=True)
    line_no = models.CharField(max_length=50,blank=True, null=True)
    room = models.CharField(max_length=50)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    def __str__(self):
        return f"desk {self.desk} - line {self.line_no} - room {self.room} - floor {self.floor_no}"