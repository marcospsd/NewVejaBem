# Generated by Django 4.0.3 on 2022-05-31 16:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0006_alter_comments_comment_post_alter_imagerec_upload'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='comments',
            name='comment_likes',
        ),
        migrations.AlterField(
            model_name='comments',
            name='comment_post',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comment_post', to='posts.post'),
        ),
    ]
