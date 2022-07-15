from django.contrib import admin
from .models import DesColabor



# Register your models here.
@admin.register(DesColabor)
class NewsVejaBem(admin.ModelAdmin):
    model = DesColabor
    list_display = ('tittle', 'content', 'created_at', 'activo')