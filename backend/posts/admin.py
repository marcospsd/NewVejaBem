from django.contrib import admin
from .forms import *
from posts.models import *


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    model = Post
    add_form = PostForm

    def __str__(self):
        return self.__str__()


@admin.register(Comments)
class PostAdmin(admin.ModelAdmin):
    model = Comments
    add_form = CommentForm

    def __str__(self):
        return self.__str__()

@admin.register(ImageRec)
class ImgAdmin(admin.ModelAdmin):
    model = ImageRec
    add_form = ImageForm

    def __str__(self):
        return self.__str__()