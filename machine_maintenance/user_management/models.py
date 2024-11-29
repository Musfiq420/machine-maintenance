from django.db import models

class Operator(models.Model):
    name = models.CharField(max_length=255)
    designation = models.CharField(max_length=255)
    assigned_line = models.IntegerField()
    assigned_block = models.IntegerField()

    def __str__(self):
        return self.name
