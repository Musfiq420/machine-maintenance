from rest_framework.viewsets import ModelViewSet
from ..models import BreakdownLog, Machine, Mechanic
from .serializers import BreakdownLogSerializer, MechanicSerializer, MachineSerializer


class MachineViewSet(ModelViewSet):
    queryset = Machine.objects.all()
    serializer_class = MachineSerializer

class MechanicViewSet(ModelViewSet):
    queryset = Mechanic.objects.all()
    serializer_class = MechanicSerializer
    
class BreakdownLogViewSet(ModelViewSet):
    queryset = BreakdownLog.objects.all()
    serializer_class = BreakdownLogSerializer

