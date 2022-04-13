from django import forms
from .models import ImageRec, Post, Comments



class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['post_content', 'post_author']



class CommentForm(forms.ModelForm):
    class Meta:
        model = Comments
        fields = ['comment_content', 'comment_author']

class ImageForm(forms.ModelForm):
    class Meta:
        model = ImageRec
        fields = ['upload']