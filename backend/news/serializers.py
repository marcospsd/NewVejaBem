from statistics import mode
from rest_framework import serializers
from news.models import *


class NewsPaperSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsVejaBem
        fields = '__all__'

class CISerializer(serializers.ModelSerializer):
    class Meta:
        model = CIVejaBem
        fields = '__all__'