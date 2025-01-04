from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from ..models import BreakdownLog, Machine, Mechanic, Type, Brand, Category, Location, Supplier
from .serializers import BreakdownLogSerializer, MechanicSerializer, MachineSerializer, TypeSerializers, BrandSerializers, CategorySerializers, SupplierSerializers, LocationSerializers
from rest_framework.exceptions import ValidationError


class MachineViewSet(ModelViewSet):
    queryset = Machine.objects.all()
    serializer_class = MachineSerializer
    # def post(self, serializer):
    #     try:
    #         serializer.save()
    #     except ValidationError as e:
    #         # Log the validation error
    #         print(f"Validation Error: {e}")
    #         raise e

class MechanicViewSet(ModelViewSet):
    queryset = Mechanic.objects.all()
    serializer_class = MechanicSerializer
    
class BreakdownLogViewSet(ModelViewSet):
    queryset = BreakdownLog.objects.all()
    serializer_class = BreakdownLogSerializer

class TypeViewSet(ModelViewSet):
    queryset = Type.objects.all()
    serializer_class = TypeSerializers

class BrandViewSet(ModelViewSet):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializers

class SupplierViewSet(ModelViewSet):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializers

class LocationViewSet(ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializers

class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializers