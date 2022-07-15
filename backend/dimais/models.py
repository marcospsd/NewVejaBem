from django.db import models
import os
# Create your models here.


def get_file_path(instance, filename):
    try:
        ext = filename.split(".")[-1]
        filename = "%s.%s" % (instance.tittle, ext)
        return os.path.join("dimais/", filename)
    except:
        return 'NONE'

class DesColabor(models.Model):
    tittle = models.CharField(max_length=50)
    content = models.FileField(upload_to=get_file_path)
    created_at = models.DateField(auto_now_add=True)
    activo = models.BooleanField(default=False)