from rest_framework import serializers
from maintenance.models import BreakdownLog
from ..models import Mechanic, Machine

class MachineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Machine
        fields = '__all__'


class MechanicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mechanic
        fields = '__all__'



class BreakdownLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = BreakdownLog
        fields = '__all__'

