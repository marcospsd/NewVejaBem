# Generated by Django 4.0.3 on 2022-06-03 19:48

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('posts', '0007_remove_comments_comment_likes_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='post_likes',
            field=models.ManyToManyField(blank=True, related_name='posts_like', to=settings.AUTH_USER_MODEL),
        ),
    ]