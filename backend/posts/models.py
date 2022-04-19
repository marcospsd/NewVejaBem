from tkinter import CASCADE
from django.db import models
from users.models import User
from ckeditor_uploader.fields import RichTextUploadingField

from django.core.files import File
from django.db import models
import os
from io import BytesIO
from PIL import Image


class Post(models.Model):
    post_content = RichTextUploadingField()
    post_created_at = models.DateTimeField(auto_now_add=True)
    post_author = models.ForeignKey(User, related_name='user_post', on_delete=models.CASCADE)
    post_likes = models.ManyToManyField(User, related_name='posts_like', null=True, blank=True)

    def __str__(self):
        return str(self.pk)

class Comments(models.Model):
    comment_post = models.ForeignKey(Post, related_name='comment_post', on_delete=models.CASCADE)
    comment_author = models.ForeignKey(User, related_name='comments_user', on_delete=models.CASCADE)
    comment_content = RichTextUploadingField()
    comment_created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.comment_post)




def get_file_path(instance, filename):
    return os.path.join("uploads_posts/", filename)

def compress(img):
    im = Image.open(img)
    im_io = BytesIO()
    widht, height = im.size
    if widht > 500:
        new_widht = 550
        new_height = round(new_widht * height / widht)
        new_image = im.resize((new_widht, new_height), Image.ANTIALIAS)
        new_image.save(im_io, format='PNG', quality=98)
        # create a Django-friendly Files object
        nova_image = File(im_io, name=img.name)
        return nova_image
    else:
        im.save(im_io, format='PNG', quality=98)
        # create a Django-friendly Files object
        nova_image = File(im_io, name=img.name)
        im.delete()
        return nova_image

class ImageRec(models.Model):
    upload = models.ImageField(upload_to=get_file_path)

    def __str__(self):
        return str(self.upload)

    def save(self, *args, **kwargs):
        new_image = compress(self.upload)
        self.upload = new_image
        super(ImageRec, self).save(*args,**kwargs)