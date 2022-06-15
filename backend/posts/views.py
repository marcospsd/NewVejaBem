from rest_framework import viewsets ,generics
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import *
from .models import *
from datetime import date




class PostsViewSets(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('-post_created_at')
    serializer_class = PostSerializers


class PostsViewSetsUser(generics.ListAPIView):
    queryset = Post.objects.all().order_by('-post_created_at')
    serializer_class = PostSerializers

    def get_queryset(self):
        if self.kwargs.get('desc_user'):
            return Post.objects.filter(post_author=self.kwargs.get('desc_user')).order_by('-post_created_at')


class LikesPostViews(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = LikePostSerializers


class CommentsViewSets(viewsets.ModelViewSet):
    queryset = Comments.objects.all().order_by('comment_created_at')
    serializer_class = CommentSerializers


class CommentsView(generics.ListAPIView):
    queryset = Comments.objects.all()
    serializer_class = CommentSerializers

    def get_queryset(self):
        if self.kwargs.get('desc_pk'):
            return Comments.objects.filter(comment_post=self.kwargs.get('desc_pk')).order_by('comment_created_at')


class ImagemViewSet(viewsets.ModelViewSet):
    queryset = ImageRec.objects.all()
    serializer_class = ImagemSerializer
