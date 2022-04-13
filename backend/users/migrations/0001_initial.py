# Generated by Django 4.0.3 on 2022-03-28 13:18

import django.contrib.auth.models
import django.contrib.auth.validators
from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('cargo', models.CharField(blank=True, max_length=50, null=True)),
                ('biografia', models.TextField(blank=True, max_length=255, null=True)),
                ('setor', models.CharField(blank=True, choices=[('1', 'DIRETORIA'), ('2', 'RECURSOS HUMANOS'), ('3', 'TELEVENDAS'), ('4', 'FINANCEIRO'), ('5', 'TECNOLOGIA DA INFORMAÇÃO'), ('6', 'ESTOQUE'), ('7', 'LABORATÓRIO'), ('8', 'LOJAS'), ('9', 'MARKETING')], max_length=1, null=True)),
                ('filial', models.CharField(blank=True, choices=[('0001', 'ADM'), ('0101', 'LOJA 01'), ('0201', 'LOJA 02'), ('0102', 'LOJA 03'), ('0301', 'LOJA 04'), ('0401', 'LOJA 05'), ('0501', 'LOJA 06'), ('0103', 'LOJA 07'), ('0302', 'LOJA 08'), ('0601', 'LOJA 09'), ('0701', 'LOJA 10'), ('0801', 'LOJA 11'), ('0901', 'LOJA 12'), ('0802', 'LOJA 13'), ('1001', 'LOJA 14'), ('1101', 'LOJA 15'), ('2001', 'LOJA 30'), ('2002', 'LOJA 31')], max_length=4, null=True)),
                ('cep', models.CharField(blank=True, max_length=9, null=True)),
                ('rua', models.CharField(blank=True, max_length=255, null=True)),
                ('bairro', models.CharField(blank=True, max_length=255, null=True)),
                ('cidade', models.CharField(blank=True, max_length=20, null=True)),
                ('numero', models.CharField(blank=True, max_length=5, null=True)),
                ('complemento', models.CharField(blank=True, max_length=50, null=True)),
                ('estciv', models.CharField(blank=True, choices=[('S', 'SOLTEIRO'), ('C', 'CASADO'), ('D', 'DIVORCIADO'), ('V', 'VIÚVO')], max_length=1, null=True)),
                ('telefone', models.CharField(blank=True, max_length=11, null=True)),
                ('celular', models.CharField(blank=True, max_length=11, null=True)),
                ('dateadmicao', models.DateField(blank=True, null=True)),
                ('datenasc', models.DateField(blank=True, null=True)),
                ('img', models.ImageField(blank=True, null=True, upload_to='media/')),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
    ]