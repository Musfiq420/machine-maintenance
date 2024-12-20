from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from ..models import BreakdownLog, Machine, Mechanic
from .serializers import BreakdownLogSerializer, MechanicSerializer, MachineSerializer
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

