# Generated by Django 4.0.3 on 2022-07-15 18:17

from django.db import migrations, models
import news.models


class Migration(migrations.Migration):

    dependencies = [
        ('news', '0002_newsvejabem_activo_alter_newsvejabem_content'),
    ]

    operations = [
        migrations.CreateModel(
            name='CIVejaBem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tittle', models.CharField(max_length=50)),
                ('created_at', models.DateField(auto_now_add=True)),
                ('content', models.FileField(upload_to=news.models.get_file_path_CI)),
                ('activo', models.BooleanField(default=False)),
            ],
        ),
    ]
