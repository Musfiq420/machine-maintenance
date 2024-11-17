from rest_framework import serializers
from .models import Mechanic, Machine, Operator, BreakdownLog

class MechanicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mechanic
        fields = '__all__'


class MachineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Machine
        fields = '__all__'


class OperatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Operator
        fields = '__all__'


class BreakdownLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = BreakdownLog
        fields = '__all__'
