from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from ..models import BreakdownLog, Machine, Mechanic
from .serializers import BreakdownLogSerializer, MechanicSerializer, MachineSerializer
from rest_framework.exceptions import ValidationError
from django_filters.rest_framework import DjangoFilterBackend
from ..filters import MachineFilter
from rest_framework import filters
from rest_framework.pagination import PageNumberPagination

class MachinePagination(PageNumberPagination):
    page_size = 10  # Number of items per page
    page_size_query_param = 'page_size'  # Allows users to specify the page size via query parameter
    max_page_size = 100  # Maximum number of items per page


class MachineViewSet(ModelViewSet):
    queryset = Machine.objects.all()
    serializer_class = MachineSerializer
    filter_backends = (DjangoFilterBackend, filters.OrderingFilter)
    filterset_class = MachineFilter
    ordering_fields = '__all__'  # Allows ordering on all fields
    ordering = ['machine_id']  # Default ordering (optional)
    pagination_class = MachinePagination

    # Optionally, you can set a default filter, for example:
    # filterset_fields = ['status', 'floor_no', 'category']

class MechanicViewSet(ModelViewSet):
    queryset = Mechanic.objects.all()
    serializer_class = MechanicSerializer
    
class BreakdownLogViewSet(ModelViewSet):
    queryset = BreakdownLog.objects.all()
    serializer_class = BreakdownLogSerializer

