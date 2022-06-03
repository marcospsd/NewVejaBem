from rest_framework import serializers
from users.models import User, VariaveisAmbiente



class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', "last_name", 'email', 'password', 'img', 'is_staff',
            'cargo','setor', 'filial', 'cep', 'rua', 'bairro', 'cidade', 'numero','biografia', 'estciv',
             'telefone', 'celular', 'dateadmicao', 'datenasc', 'complemento',
        
        ]

    def create(self, validated_data):
        conta = User.objects.create(
            username=self.validated_data['username'],
            first_name=self.validated_data['first_name'],
            email=self.validated_data['email'],
        )
        senha = self.validated_data['password']
        conta.set_password(senha)
        conta.save()
        return conta


class VariaveisAmbienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = VariaveisAmbiente
        fields = '__all__'