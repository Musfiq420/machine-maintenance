from django.db import models

class Mechanic(models.Model):
    name = models.CharField(max_length=255)
    designation = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Machine(models.Model):
    STATUS_CHOICES = [
        ('Running', 'Running'),
        ('Under Maintenance', 'Under Maintenance'),
        ('Broken', 'Broken'),
    ]

    name = models.CharField(max_length=255)
    company = models.CharField(max_length=255)
    model_number = models.CharField(max_length=255, unique=True)
    purchase_date = models.DateTimeField()
    block_no = models.IntegerField()
    line_no = models.IntegerField()
    location = models.CharField(max_length=255)
    last_breakdown_start = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES)

    def __str__(self):
        return self.name


class Operator(models.Model):
    name = models.CharField(max_length=255)
    designation = models.CharField(max_length=255)
    assigned_line = models.IntegerField()
    assigned_block = models.IntegerField()

    def __str__(self):
        return self.name


class BreakdownLog(models.Model):
    machine = models.ForeignKey(Machine, on_delete=models.CASCADE)
    mechanic = models.ForeignKey(Mechanic, on_delete=models.CASCADE)
    operator = models.ForeignKey(Operator, on_delete=models.CASCADE)
    problem_category = models.CharField(max_length=255)
    breakdown_start = models.DateTimeField()
    lost_time = models.DurationField()
    comments = models.TextField()

    def __str__(self):
        return f"Log for {self.machine.name}"
