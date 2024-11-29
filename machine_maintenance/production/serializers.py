from rest_framework import serializers
from .models import Machine

class MachineSerializer(serializers.ModelSerializer):
    qr_code_image = serializers.ImageField(use_url=True)
    class Meta:
        model = Machine
        fields = '__all__'
