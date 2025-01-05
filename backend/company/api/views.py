from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from ..models import Company, Location
from .serializers import CompanySerializer, LocationSerializers
# Create your views here.
class CompanyViewSet(ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

class LocationViewSet(ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializers