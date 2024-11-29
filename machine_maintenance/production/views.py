from django.shortcuts import render
# Create your views here.
from rest_framework.viewsets import ModelViewSet
from .models import Machine
from .serializers import MachineSerializer

class MachineViewSet(ModelViewSet):
    queryset = Machine.objects.all()
    serializer_class = MachineSerializer