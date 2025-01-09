from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from ..models import BreakdownLog, Machine, Type, Brand, Category, Location, Supplier, ProblemCategory
from .serializers import BreakdownLogSerializer, MachineSerializer, TypeSerializers, BrandSerializers, CategorySerializers, SupplierSerializers, ProblemCategorySerializers
from rest_framework.exceptions import ValidationError
from django_filters.rest_framework import DjangoFilterBackend
from ..filters import MachineFilter
from rest_framework import filters
from rest_framework.pagination import PageNumberPagination
from permissions.base_permissions import IsAdmin, IsHR, IsMechanic, IsSupervisor, IsAdminOrSupervisorOrMechanic, IsAdminOrMechanic
from rest_framework.exceptions import NotFound
from django.db.models import Sum
from rest_framework.decorators import action

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
    ordering = ['id']  # Default ordering (optional)
    pagination_class = MachinePagination
    search_fields = ['machine_id', 'brand__name', 'category__name', 'type__name', 'model_number', 'serial_no', 'location__room']

    def get_ordering(self):
        ordering = self.request.query_params.get('ordering', None)
        if ordering:
            # Validate if the ordering field is allowed
            allowed_fields = ['purchase_date', 'brand_name', 'categoryname', 'type_name']
            if ordering not in allowed_fields:
                raise NotFound(f"Ordering by '{ordering}' is not allowed.")
            return [ordering]
        return super().get_ordering()
    # def get_permissions(self):
    #     if self.action in ['list', 'retrieve']:
    #         # print(f"{self.action.capitalize()} called.")
    #         return [IsAdminOrSupervisorOrMechanic()]
        
    #     if self.action in ['create', 'update', 'partial_update', 'destroy']:
    #         # print(f"{self.action} called.")
    #         return [IsAdminOrMechanic()]  # Adjust as needed
        
    #     return super().get_permissions()


    
class BreakdownLogViewSet(ModelViewSet):
    queryset = BreakdownLog.objects.all()
    serializer_class = BreakdownLogSerializer

    @action(detail=False, methods=["get"], url_path="total-lost-time-per-machine")
    def total_lost_time_per_machine(self, request):
        # Aggregate lost time for each machine
        lost_time_per_machine = (
            self.get_queryset()
            .values("machine__id", "machine__model_number")
            .annotate(total_lost_time=Sum("lost_time"))
            .order_by("machine__model_number")  # Optional: Sort by model number
        )

        # Convert total_lost_time to HH:MM:SS format
        for item in lost_time_per_machine:
            total_lost_time = item["total_lost_time"]
            if total_lost_time is not None:
                # Directly convert timedelta to string
                item["total_lost_time"] = str(total_lost_time)
            else:
                item["total_lost_time"] = "0:00:00"

        return Response(lost_time_per_machine)
    

    @action(detail=False, methods=["get"], url_path="total-lost-time-per-location")
    def total_lost_time(self, request):
        # Parse query parameters
        rooms = request.query_params.get("location_room", "")  # Example: "A,B"
        line_nos = request.query_params.get("location_line_no", "")  # Example: "1,2"

        # Split the parameters into lists
        room_list = rooms.split(",") if rooms else []
        line_no_list = line_nos.split(",") if line_nos else []

        # Filter the BreakdownLog queryset based on the parameters
        breakdown_queryset = self.get_queryset()
        if room_list:
            breakdown_queryset = breakdown_queryset.filter(location__room__in=room_list)
        if line_no_list:
            breakdown_queryset = breakdown_queryset.filter(location__line_no__in=line_no_list)

        # Calculate the total lost time
        total_lost_time = breakdown_queryset.aggregate(Sum("lost_time"))["lost_time__sum"]

        # Format the total lost time
        formatted_total_lost_time = str(total_lost_time) if total_lost_time else "0:00:00"

        # Filter the Machine queryset based on the parameters
        machine_queryset = Machine.objects.all()
        print(machine_queryset)
        if room_list:
            machine_queryset = machine_queryset.filter(location__room__in=room_list)
        if line_no_list:
            machine_queryset = machine_queryset.filter(location__line_no__in=line_no_list)

        # Calculate machine stats
        total_machine_count = machine_queryset.count()
        total_active_machines = machine_queryset.filter(status="active").count()
        total_repairing_machines = machine_queryset.filter(status="maintenance").count()
        total_idle_machines = machine_queryset.filter(status="inactive").count()

        # Serialize the machines
        machine_data = [
            {
                "id": machine.id,
                "machine_id": machine.machine_id,
                "model_number": machine.model_number,
                "serial_no": machine.serial_no,
                "purchase_date": machine.purchase_date,
                "last_breakdown_start": machine.last_breakdown_start,
                "status": machine.status,
                "category": machine.category.id if machine.category else None,
                "type": machine.type.id if machine.type else None,
                "brand": machine.brand.id if machine.brand else None,
                "location": machine.location.id if machine.location else None,
                "supplier": machine.supplier.id if machine.supplier else None,
            }
            for machine in machine_queryset
        ]

        # Build the response
        response_data = {
            "rooms": room_list,
            "line_nos": line_no_list,
            "total_lost_time": formatted_total_lost_time,
            "total_machine_count": total_machine_count,
            "total_active_machines": total_active_machines,
            "total_repairing_machines": total_repairing_machines,
            "total_idle_machines": total_idle_machines,
            "machines": machine_data,
        }

        return Response(response_data)
    # def get_permissions(self):
    #     if self.action in ['list', 'retrieve', 'create', 'update', 'partial_update', 'destroy']:
    #         return [IsAdmin()]  # Adjust as needed   
    #     return super().get_permissions()

class TypeViewSet(ModelViewSet):
    queryset = Type.objects.all()
    serializer_class = TypeSerializers

class BrandViewSet(ModelViewSet):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializers

class SupplierViewSet(ModelViewSet):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializers



class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializers

class ProblemCategoryViewSet(ModelViewSet):
    queryset = ProblemCategory.objects.all()
    serializer_class = ProblemCategorySerializers

