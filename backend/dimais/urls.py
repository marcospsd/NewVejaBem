from rest_framework.routers import SimpleRouter
from django.urls import path
from .views import DesColaboradorView

dimaisrouter = SimpleRouter()
dimaisrouter.register('descolaborador', DesColaboradorView)