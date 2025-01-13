# from rest_framework import viewsets
# from ..models import ProductionLine, Floor
# from .serializers import ProductionLineSerializer, FloorSerializer

# class ProductionLineViewSet(viewsets.ModelViewSet):
#     queryset = ProductionLine.objects.select_related('floor').all()
#     serializer_class = ProductionLineSerializer

# class FloorViewSet(viewsets.ModelViewSet):
#     queryset = Floor.objects.all()
#     serializer_class = FloorSerializer
