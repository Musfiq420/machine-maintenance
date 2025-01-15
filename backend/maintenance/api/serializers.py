from rest_framework import serializers
from maintenance.models import BreakdownLog
from ..models import Machine, Type, Brand, Category, Supplier, ProblemCategory

class MachineSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source='category.name', read_only=True)
    type = serializers.CharField(source='type.name', read_only=True)
    brand = serializers.CharField(source='brand.name', read_only=True)
    line = serializers.CharField(source='line.name', read_only=True)
    supplier = serializers.CharField(source='supplier.name', read_only=True)
    company = serializers.CharField(source='company.name', read_only=True)
    class Meta:
        model = Machine
        fields = '__all__'


class BreakdownLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = BreakdownLog
        fields = '__all__'


class BrandSerializers(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = '__all__'

class TypeSerializers(serializers.ModelSerializer):
    class Meta:
        model = Type
        fields = '__all__'

class CategorySerializers(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class SupplierSerializers(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = '__all__'

class ProblemCategorySerializers(serializers.ModelSerializer):
    class Meta:
        model = ProblemCategory
        fields = '__all__'