from django.db import models

# Create your models here.


class NewsVejaBem(models.Model):
    tittle = models.CharField(max_length=50)
    created_at = models.DateField(auto_now_add=True)
    content = models.FileField(upload_to='newspaper/')