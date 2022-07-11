from rest_framework.routers import SimpleRouter
from django.urls import path
from news.views import NewsPaperView

newsrouter = SimpleRouter()
newsrouter.register('newspaper', NewsPaperView)
