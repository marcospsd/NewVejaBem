# Generated by Django 4.0.3 on 2022-07-15 17:45

import dimais.models
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='DesColabor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tittle', models.CharField(max_length=50)),
                ('content', models.FileField(upload_to=dimais.models.get_file_path)),
                ('created_at', models.DateField(auto_now_add=True)),
                ('activo', models.BooleanField(default=False)),
            ],
        ),
    ]
