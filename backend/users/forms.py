from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import User
from django import forms


class UserChangeForm(UserChangeForm):
    class Meta(UserChangeForm.Meta):
        model = User


class UserCreateForm(UserCreationForm):
    first_name = forms.CharField(label='Nome Completo')
    username = forms.CharField(label='Username', min_length=4, max_length=150)
    email = forms.EmailField(label='Email')
    password1 = forms.CharField(label='Senha', widget=forms.PasswordInput)
    password2 = forms.CharField(label='Confirme sua Senha', widget=forms.PasswordInput)

    class Meta(UserCreationForm.Meta):
        model = User
        fields = ["first_name", "username", "email", "password1", "password2",]

class UserUpdateForm(forms.ModelForm):
    first_name = forms.CharField(label='Nome Completo', required=False)
    last_name = forms.CharField(label='Apelido', required=False)
    cargo =  forms.CharField(label='Cargo', required=False)
    setor = forms.CharField(label='Setor', required=False)
    filial = forms.CharField(label='Filial', required=False)
    cep = forms.CharField(label='Cep', required=False)
    rua = forms.CharField(label='Rua', required=False)
    bairro = forms.CharField(label='Bairro', required=False)
    cidade = forms.CharField(label='Cidade', required=False)
    numero = forms.CharField(label='Numero', required=False)
    estciv = forms.CharField(label='Estado Civil', required=False)
    telefone = forms.CharField(label='Telefone', required=False)
    celular = forms.CharField(label='Celular', required=False)
    dateadmicao = forms.DateField(label='Data de Admição', required=False)
    datenasc = forms.DateField(label='Data de Nascimento', required=False)
    img = forms.ImageField(label='Input Imagem', required=False)

    class Meta(UserChangeForm.Meta):
        model = User
        fields = ["first_name", "last_name", "cargo", "setor", "filial", "cep", "rua", "bairro", "cidade", "numero", "estciv", "telefone", "celular", "dateadmicao", "datenasc", "img",]