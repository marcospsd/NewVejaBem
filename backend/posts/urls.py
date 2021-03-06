from django.contrib import admin
from .views import *
from django.urls import path, include, re_path
from rest_framework.routers import SimpleRouter



router = SimpleRouter()
router.register('posts', PostsViewSets)
router.register('like', LikesPostViews)
router.register('comments', CommentsViewSets)
router.register('upload', ImagemViewSet)



urlpatterns = [
    path('viewcomments/<desc_pk>', CommentsView.as_view(), name='desc_pk'),
    path('postsuser/<desc_user>', PostsViewSetsUser.as_view(), name='desc_user')
]