from tabnanny import verbose
from rest_framework.response import Response
from django.http import JsonResponse
from users.models import VariaveisAmbiente
from rest_framework import serializers
from .models import *
from users.models import User
from django.shortcuts import get_object_or_404
import json



class ImagemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageRec
        fields = '__all__'


    def to_representation(self, instance):
        data = super(ImagemSerializer, self).to_representation(instance)
        result_data = {"status" : 200, "message" : "Category List" }
        result_data["url"]= data['upload']
        return result_data



class UserPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['pk', 'first_name', 'img']
        


class PostSerializers(serializers.ModelSerializer):
    author_name = UserPostSerializer(source='post_author', read_only=True)

    class Meta:
        model = Post
        fields = '__all__'
        read_only_fields = ['pk']

    def create(self, validated_data):
        status = VariaveisAmbiente.objects.filter(variavel='POST_FEED_USERS').values_list('status', flat=True)[0]
        if status is True:
            dado = Post.objects.create(**validated_data)
            return dado



class LikePostSerializers(serializers.ModelSerializer):
    usuarios = UserPostSerializer(source='post_likes', many=True, read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'post_likes', 'usuarios']

    def update(self, instance, validated_data):
        data = get_object_or_404(Post, id=instance.id)
        id = User.objects.filter(username=(validated_data['post_likes'])[0]).values_list('id', flat=True)[0]
        if id in list(data.post_likes.values_list('id', flat=True)):
            data.post_likes.remove(validated_data['post_likes'][0])
        else:
            data.post_likes.add(validated_data['post_likes'][0])
        return instance



class CommentSerializers(serializers.ModelSerializer):
    author_name = UserPostSerializer(source='comment_author', read_only=True)

    class Meta:
        model = Comments
        fields = '__all__'



