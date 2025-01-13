# from rest_framework import serializers
# from ..models import ProductionLine, Floor

# class FloorSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Floor
#         fields = '__all__'

# class ProductionLineSerializer(serializers.ModelSerializer):
#     floor = FloorSerializer()  # Nested representation

#     class Meta:
#         model = ProductionLine
#         fields = ['id', 'name', 'description', 'operation_type', 'floor']