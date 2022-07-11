from rest_framework import viewsets ,generics
from news.models import NewsVejaBem
from news.serializers import *
# Create your views here.


class NewsPaperView(viewsets.ModelViewSet):
    queryset = NewsVejaBem.objects.all().order_by('-created_at')
    serializer_class = NewsPaperSerializer
