from statistics import mode
from rest_framework import serializers
from news.models import *


class NewsPaperSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsVejaBem
        fields = '__all__'