from django.contrib import admin
from django.contrib.auth import admin as auth_admin
from .models import User
from .forms import UserChangeForm, UserCreateForm



@admin.register(User)
class UserAdmin(auth_admin.UserAdmin):
    add_form = UserCreateForm
    model = User
    fieldsets = auth_admin.UserAdmin.fieldsets + (
        ("Campos Personalizados", {"fields": ("biografia", "cargo", "setor", "filial", "cep", "rua", "bairro", "cidade",
                                              "numero", "estciv", "telefone", "celular", "dateadmicao", "datenasc",
                                              "complemento", "img")}),
    )
