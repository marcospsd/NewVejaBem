import os
from io import BytesIO
from PIL import Image

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.files import File

def get_file_path(instance, filename):
    try:
        ext = filename.split(".")[-1]
        filename = "%s.%s" % (instance.id, ext)
        return os.path.join("img_perfil/", filename)
    except:
        return 'NONE'

def compress(img):
    im = Image.open(img)
    im_io = BytesIO()
    widht, height = im.size
    if widht > 100:
        new_widht = 400
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


class User(AbstractUser, models.Model):
    SETOR_EMPRESA = (
        ('1', 'DIRETORIA'),
        ('2', 'RECURSOS HUMANOS'),
        ('3', 'TELEVENDAS'),
        ('4', 'FINANCEIRO'),
        ('5', 'TECNOLOGIA DA INFORMAÇÃO'),
        ('6', 'ESTOQUE'),
        ('7', 'LABORATÓRIO'),
        ('8', 'LOJAS'),
        ('9', 'MARKETING')
    )

    FILIAL_EMPRESA = (
        ('0001', 'ADM'),
        ('0101', 'LOJA 01'),
        ('0201', 'LOJA 02'),
        ('0102', 'LOJA 03'),
        ('0301', 'LOJA 04'),
        ('0401', 'LOJA 05'),
        ('0501', 'LOJA 06'),
        ('0103', 'LOJA 07'),
        ('0302', 'LOJA 08'),
        ('0601', 'LOJA 09'),
        ('0701', 'LOJA 10'),
        ('0801', 'LOJA 11'),
        ('0901', 'LOJA 12'),
        ('0802', 'LOJA 13'),
        ('1001', 'LOJA 14'),
        ('1101', 'LOJA 15'),
        ('2001', 'LOJA 30'),
        ('2002', 'LOJA 31'),
    )

    ESTADOCIVIL_USUARIO = (
        ('S', 'SOLTEIRO'),
        ('C', 'CASADO'),
        ('D', 'DIVORCIADO'),
        ('V', 'VIÚVO',)
    )

    

    cargo = models.CharField(blank=True, max_length=50, null=True)
    biografia = models.TextField(blank=True, max_length=255, null=True)
    setor = models.CharField(blank=True, max_length=1, null=True, choices=SETOR_EMPRESA)
    filial = models.CharField(blank=True, max_length=4, null=True, choices=FILIAL_EMPRESA)
    cep = models.CharField(blank=True, max_length=9, null=True)
    rua = models.CharField(blank=True, max_length=255, null=True)
    bairro = models.CharField(blank=True, max_length=255, null=True)
    cidade = models.CharField(blank=True, max_length=20, null=True)
    numero = models.CharField(blank=True, max_length=5, null=True)
    complemento = models.CharField(blank=True, max_length=50, null=True)
    estciv = models.CharField(blank=True, max_length=1, null=True, choices=ESTADOCIVIL_USUARIO)
    telefone = models.CharField(blank=True, max_length=11, null=True)
    celular = models.CharField(blank=True, max_length=11, null=True)
    dateadmicao = models.DateField(blank=True, null=True)
    datenasc = models.DateField(blank=True, null=True)
    img = models.ImageField(upload_to=get_file_path, blank=True, null=True)

    def save(self, *args, **kwargs):
        if self.img:
            newimg = compress(self.img)
            self.img = newimg
            super().save(*args, **kwargs)
        else:
            super().save(*args, **kwargs)


class VariaveisAmbiente(models.Model):
    variavel = models.CharField(max_length=20)
    descricao = models.CharField(max_length=255, blank=True, null=True)
    status = models.BooleanField(default=False)
    valor2 = models.CharField(max_length=50, blank=True, null=True)
    valor3 = models.CharField(max_length=50, blank=True, null=True)
    valor4 = models.CharField(max_length=50, blank=True, null=True)