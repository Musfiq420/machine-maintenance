from django.contrib import admin
from .models import Mechanic, BreakdownLog
# Register your models here.
admin.site.register(BreakdownLog)
admin.site.register(Mechanic)