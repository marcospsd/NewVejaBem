from django.contrib import admin
from .models import NewsVejaBem



# Register your models here.
@admin.register(NewsVejaBem)
class NewsVejaBem(admin.ModelAdmin):
    model = NewsVejaBem
    list_display = ('tittle', 'created_at' )