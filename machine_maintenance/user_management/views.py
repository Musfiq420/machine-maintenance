from rest_framework.viewsets import ModelViewSet
from .models import Operator
from .serializers import OperatorSerializer

class OperatorViewSet(ModelViewSet):
    queryset = Operator.objects.all()
    serializer_class = OperatorSerializer
