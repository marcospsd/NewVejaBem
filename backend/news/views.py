from rest_framework import viewsets ,generics
from news.models import NewsVejaBem, CIVejaBem
from news.serializers import *
# Create your views here.


class NewsPaperView(viewsets.ModelViewSet):
    queryset = NewsVejaBem.objects.all().filter(activo=True).order_by('-created_at').order_by('-id')
    serializer_class = NewsPaperSerializer

class EndNewsPaperView(viewsets.ModelViewSet):
    queryset = NewsVejaBem.objects.all().filter(activo=True).order_by('-created_at').order_by('-id')[:1]
    serializer_class = NewsPaperSerializer

class AllPaperView(viewsets.ModelViewSet):
    queryset = NewsVejaBem.objects.all().order_by('-created_at').order_by('-id')
    serializer_class = NewsPaperSerializer


class CIVejaBemView(viewsets.ModelViewSet):
    queryset = CIVejaBem.objects.all().filter(activo=True).order_by('-created_at').order_by('-id')
    serializer_class = CISerializer

class EndCIVejaBemView(viewsets.ModelViewSet):
    queryset = CIVejaBem.objects.all().filter(activo=True).order_by('-created_at').order_by('-id')[:1]
    serializer_class = CISerializer

class AllCIVejaBemView(viewsets.ModelViewSet):
    queryset = CIVejaBem.objects.all().order_by('-created_at').order_by('-id')
    serializer_class = CISerializer