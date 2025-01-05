from django.contrib import admin

# Register your models here.
from .models import Company, Location
# Register your models here.
class CompanyAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'id',
    )

class LocationAdmin(admin.ModelAdmin):
    list_display = ('floor_no', 'desk', 'line_no')
    # prepopulated_fields = {'slug': ('floor_no','line_no',)}


admin.site.register(Company, CompanyAdmin)
admin.site.register(Location, LocationAdmin)