from django.contrib import admin
from .models import CIVejaBem, NewsVejaBem



# Register your models here.
@admin.register(NewsVejaBem)
class NewsVejaBemADMIN(admin.ModelAdmin):
    model = NewsVejaBem
    list_display = ('tittle', 'created_at' )

@admin.register(CIVejaBem)
class CIVejaBemADMIN(admin.ModelAdmin):
    model = CIVejaBem
    list_display = ('tittle', 'created_at' )