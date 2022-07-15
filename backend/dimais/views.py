from rest_framework import viewsets ,generics
from .models import DesColabor
from .serializers import *
# Create your views here.


class DesColaboradorView(viewsets.ModelViewSet):
    queryset = DesColabor.objects.all()
    serializer_class = DesColaborSerializer
