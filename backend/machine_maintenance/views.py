from rest_framework import viewsets
from .models import Mechanic, Machine, Operator, BreakdownLog
from .serializers import MechanicSerializer, MachineSerializer, OperatorSerializer, BreakdownLogSerializer

class MechanicViewSet(viewsets.ModelViewSet):
    queryset = Mechanic.objects.all()
    serializer_class = MechanicSerializer


class MachineViewSet(viewsets.ModelViewSet):
    queryset = Machine.objects.all()
    serializer_class = MachineSerializer


class OperatorViewSet(viewsets.ModelViewSet):
    queryset = Operator.objects.all()
    serializer_class = OperatorSerializer


class BreakdownLogViewSet(viewsets.ModelViewSet):
    queryset = BreakdownLog.objects.all()
    serializer_class = BreakdownLogSerializer
