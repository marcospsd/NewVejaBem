from django.contrib import admin
from django.contrib.auth import admin as auth_admin
from .models import User, VariaveisAmbiente, FilhosExists
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


@admin.register(FilhosExists)
class FilhosExistsAdmin(admin.ModelAdmin):
    model = FilhosExists
    list_display = ('nome', 'sexo', 'datanasc', )


@admin.register(VariaveisAmbiente)
class UserAdmin(admin.ModelAdmin):
    model = VariaveisAmbiente
    list_display = ('variavel', 'descricao', 'status', 'valor2', 'valor3', 'valor4' )