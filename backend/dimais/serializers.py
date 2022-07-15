from rest_framework import serializers
from .models import *


class DesColaborSerializer(serializers.ModelSerializer):
    class Meta:
        model = DesColabor
        fields = '__all__'