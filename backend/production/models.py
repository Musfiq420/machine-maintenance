# from django.db import models


# class ProductionLine(models.Model):
#     OPERATION_TYPES = [
#             ('cutting', 'Cutting'),
#             ('sewing', 'Sewing'),
#             ('washing', 'Washing'),
#             ('finishing', 'Finishing')
#         ]
#     name = models.CharField(max_length=100, unique=True)
#     description = models.TextField(null=True, blank=True)
#     operation_type = models.CharField(max_length=50, choices=OPERATION_TYPES)
#     floor = models.ForeignKey(Floor, on_delete=models.CASCADE, related_name='production_lines')

#     def __str__(self):
#         return f"{self.name} (Floor: {self.floor})"

# class Floor(models.Model):
#     name = models.CharField(max_length=100, unique=True)  # Optional descriptive name

#     def __str__(self):
#         return f"{self.name}"