from django.db import models

class Machine(models.Model):
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('inactive', 'Inactive'),
        ('maintenance', 'Under Maintenance'),
        ('broken', 'Broken'),
    ]

    name = models.CharField(max_length=255, unique=True)
    company = models.CharField(max_length=255, blank=True, null=True)
    model_number = models.CharField(max_length=255, blank=True, null=True)
    purchase_date = models.DateField(blank=True, null=True)
    block_no = models.IntegerField(blank=True, null=True)
    line_no = models.IntegerField(blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    last_breakdown_start = models.DateTimeField(blank=True, null=True)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='active')

    def __str__(self):
        return f"{self.name} ({self.model_number})"
"""

import qrcode
from django.db import models
from io import BytesIO
from django.core.files.base import ContentFile
from django.utils.crypto import get_random_string

class Machine(models.Model):
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('inactive', 'Inactive'),
        ('maintenance', 'Under Maintenance'),
        ('broken', 'Broken'),
    ]

    name = models.CharField(max_length=255, unique=True)
    company = models.CharField(max_length=255, blank=True, null=True)
    model_number = models.CharField(max_length=255, blank=True, null=True)
    purchase_date = models.DateField(blank=True, null=True)
    block_no = models.IntegerField(blank=True, null=True)
    line_no = models.IntegerField(blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    last_breakdown_start = models.DateTimeField(blank=True, null=True)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='active')
    qr_code_image = models.ImageField(upload_to='machine_qr_codes/', blank=True, null=True)

    def __str__(self):
        return f"{self.name} ({self.model_number})"
    


# def generate_qr_code(self):
#         # Generate the unique data string (e.g., machine name, model number)
#         qr_data = f"{self.name}-{self.model_number}-{get_random_string(6)}"
        
#         # Generate QR code
#         qr = qrcode.make(qr_data)

#         # Save QR code to a file-like object
#         qr_image = BytesIO()
#         qr.save(qr_image, 'PNG')
#         qr_image.seek(0)

#         # Save the QR code as an image
#         self.qr_code_image.save(f'{self.name}_qr.png', ContentFile(qr_image.read()), save=False)

#         # Save the machine object with the QR code image
#         self.save()

"""