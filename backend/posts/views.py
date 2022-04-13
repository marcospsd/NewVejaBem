from xml.etree.ElementTree import Comment
from rest_framework import viewsets
from .serializers import *
from .models import *
from django.shortcuts import render, get_object_or_404, redirect
# Create your views here.



class PostsViewSets(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('-post_created_at')
    serializer_class = PostSerializers

class CommentsViewSets(viewsets.ModelViewSet):
    queryset = Comments.objects.all()
    serializer_class = CommentSerializers

class ImagemViewSet(viewsets.ModelViewSet):
    queryset = ImageRec.objects.all()
    serializer_class = ImagemSerializer
