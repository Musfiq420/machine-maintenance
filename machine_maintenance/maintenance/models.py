from django.db import models
from production.models import Machine
from user_management.models import Operator

class Mechanic(models.Model):
    name = models.CharField(max_length=255)
    designation = models.CharField(max_length=255)

    def __str__(self):
        return self.name




class BreakdownLog(models.Model):
    machine = models.ForeignKey(Machine, on_delete=models.CASCADE, related_name="breakdowns")
    mechanic = models.ForeignKey(Mechanic, on_delete=models.SET_NULL, null=True, related_name="breakdowns")
    operator = models.ForeignKey(Operator, on_delete=models.SET_NULL, null=True, related_name="breakdowns")
    problem_category = models.CharField(max_length=255)
    breakdown_start = models.DateTimeField()
    lost_time = models.DurationField()
    comments = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Breakdown for {self.machine.name} on {self.breakdown_start}"

    class Meta:
        verbose_name = "Breakdown Log"
        verbose_name_plural = "Breakdown Logs"
        ordering = ["-breakdown_start"]
