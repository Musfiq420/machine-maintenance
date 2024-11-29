from rest_framework.viewsets import ModelViewSet
from .models import BreakdownLog
from .serializers import BreakdownLogSerializer
from .models import Mechanic
from .serializers import MechanicSerializer


class MechanicViewSet(ModelViewSet):
    queryset = Mechanic.objects.all()
    serializer_class = MechanicSerializer
    
class BreakdownLogViewSet(ModelViewSet):
    queryset = BreakdownLog.objects.all()
    serializer_class = BreakdownLogSerializer
