from rest_framework import serializers
from users.models import User, VariaveisAmbiente, FilhosExists
from django.core.mail import send_mail



class FilhoSerializer(serializers.ModelSerializer):
    class Meta:
        model = FilhosExists
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)
    filhos = FilhoSerializer(source='filhos_user', many=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', "last_name", 'email', 'password', 'img', 'is_staff',
            'cargo','setor', 'filial', 'cep', 'rua', 'bairro', 'cidade', 'numero','biografia', 'estciv',
             'telefone', 'celular', 'dateadmicao', 'datenasc', 'complemento', 'filhos'
        ]
        

    def create(self, validated_data):
        conta = User.objects.create(
            username=self.validated_data['username'],
            first_name=(self.validated_data['first_name']).title(),
            email=self.validated_data['email'],
        )
        senha = self.validated_data['password']
        conta.set_password(senha)
        # send_mail('Criado com Sucesso', 'Sua conta foi criada com sucesso', 'noreply@dinizvitoria.com.br', ['mdias@dinizvitoria.com.br'])
        conta.save()
        return conta

class ChangePasswordSerializer(serializers.Serializer):
    password = serializers.CharField(write_only=True, required=True)
    class Meta:
        model = User
        fields = ['password']

    def update(self, instance, validated_data):
        print(validated_data)
        instance.set_password(validated_data['password'])
        instance.save()
        return instance


class VariaveisAmbienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = VariaveisAmbiente
        fields = '__all__'