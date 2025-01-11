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
from django.utils import timezone
from datetime import timedelta

from rest_framework.exceptions import PermissionDenied

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

    # permission_classes = [DjangoModelPermissions]

    def get_ordering(self):
        ordering = self.request.query_params.get('ordering', None)
        if ordering:
            # Validate if the ordering field is allowed
            allowed_fields = ['purchase_date', 'brand_name', 'categoryname', 'type_name']
            if ordering not in allowed_fields:
                raise NotFound(f"Ordering by '{ordering}' is not allowed.")
            return [ordering]
        return super().get_ordering()
    
    # def get_queryset(self):
    #     # Check if the user belongs to the "Machine Viewer" group
    #     if not self.request.user.groups.filter(name="Machine-Viewer").exists():
    #         raise PermissionDenied("You do not have permission to view machines.")

    #     # If the user is in the "Machine Viewer" group, return the queryset
    #     return super().get_queryset()
    
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
    
    @action(detail=False, methods=["get"], url_path="machines-monitoring")
    def machine_monitoring(self, request):
        machine_id = request.query_params.get("machine_id")
        if not machine_id:
            return Response({"error": "Machine ID is required"}, status=400)

        # Retrieve the machine object based on the provided machine_id
        machine = Machine.objects.filter(machine_id=machine_id).first()
        if not machine:
            return Response({"error": "Machine not found"}, status=404)
         # Get the breakdowns for the specified machine in the last week
        one_week_ago = timezone.now() - timedelta(weeks=1)
        breakdowns_last_week = BreakdownLog.objects.filter(
            machine=machine, breakdown_start__gte=one_week_ago
        )

        # Calculate total lost time for the last week
        total_lost_time_last_week = breakdowns_last_week.aggregate(
            total_lost_time=Sum("lost_time")
        )["total_lost_time"]

        # Calculate the number of breakdowns in the last week
        breakdowns_count_last_week = breakdowns_last_week.count()
        
        # Calculate utilization based on the breakdowns (Assume utilization is a ratio of active time to total time in the last week)
        total_active_time_last_week = sum(
            breakdown.lost_time.total_seconds() for breakdown in breakdowns_last_week
        )
        total_week_minutes = 7 * 10 * 60  # 1 week in seconds
        utilization_last_week = 1 - ((total_active_time_last_week/60) / total_week_minutes) if total_week_minutes > 0 else 0

        # Calculate Mean Time Between Failures (MTBF) for the last week
        if breakdowns_count_last_week > 1:
            mtbf_numbers = (total_week_minutes/breakdowns_count_last_week)
            mtbf_last_week = timedelta(minutes=mtbf_numbers)
        else:
            mtbf_last_week = None

        # Breakdown details for the last week
        breakdown_details_last_week = [
            {
                "breakdown-start": breakdown.breakdown_start,
                "lost-time": str(breakdown.lost_time),
            }
            for breakdown in breakdowns_last_week
        ]

        # Lost time reasons for the last week (group by problem category)
        lost_time_reasons_last_week = (
            breakdowns_last_week.values("problem_category__name")
            .annotate(total_lost_time=Sum("lost_time"))
            .order_by("problem_category__name")
        )

        lost_time_reasons_last_week = [
            {
                "problem-category": reason["problem_category__name"],
                "lost-time": str(reason["total_lost_time"]),
            }
            for reason in lost_time_reasons_last_week
        ]

        # Format total lost time to HH:MM:SS
        formatted_total_lost_time_last_week = str(total_lost_time_last_week) if total_lost_time_last_week else "0:00:00"
        formatted_mtbf_last_week = str(mtbf_last_week) if mtbf_last_week else "0:00:00"

        # Prepare the response data
        response_data = {
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
            "total-lost-time-last-week": formatted_total_lost_time_last_week,
            "utilization-last-week": utilization_last_week,
            "breakdowns-count-last-week": breakdowns_count_last_week,
            "MTBF-last-week": formatted_mtbf_last_week,
            "breakdowns-last-week": breakdown_details_last_week,
            "lost-time-reasons-last-week": lost_time_reasons_last_week,
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

