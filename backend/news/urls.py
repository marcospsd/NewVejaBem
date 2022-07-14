from rest_framework.routers import SimpleRouter
from django.urls import path
from news.views import NewsPaperView, EndNewsPaperView, AllPaperView

newsrouter = SimpleRouter()
newsrouter.register('newspaper', NewsPaperView)
newsrouter.register('endnewspaper', EndNewsPaperView)
newsrouter.register('allnewspaper', AllPaperView)
