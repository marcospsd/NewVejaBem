from tabnanny import verbose
from rest_framework import serializers
from .models import *
from users.models import User



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

        


class CommentSerializers(serializers.ModelSerializer):
    author_name = UserPostSerializer(source='comment_author', read_only=True)

    class Meta:
        model = Comments
        fields = '__all__'



