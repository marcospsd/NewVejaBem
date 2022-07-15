from rest_framework.routers import SimpleRouter
from django.urls import path
from news.views import *

newsrouter = SimpleRouter()
newsrouter.register('newspaper', NewsPaperView)
newsrouter.register('endnewspaper', EndNewsPaperView)
newsrouter.register('allnewspaper', AllPaperView)
newsrouter.register('ci', CIVejaBemView)
newsrouter.register('endci', EndCIVejaBemView)
newsrouter.register('allci', AllCIVejaBemView)

