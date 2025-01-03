from django.contrib import admin

# Register your models here.
from .models import Company
# Register your models here.
class CompanyAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'name',
    )
admin.site.register(Company, CompanyAdmin)