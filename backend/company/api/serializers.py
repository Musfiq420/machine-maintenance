from rest_framework import serializers
from ..models import Company, Location

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'


class LocationSerializers(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'