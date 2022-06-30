from datetime import date

from rest_framework import generics
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework import viewsets ,generics

from rest_framework import permissions
from rest_framework.generics import CreateAPIView
from users.models import User, VariaveisAmbiente, FilhosExists

from .serializers import *

from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response


class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'nome': user.first_name,
            'iduser': user.pk,
        })

class CreateUserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = UserSerializer


class VariaveisAmbienteView(viewsets.ModelViewSet):
    queryset = VariaveisAmbiente.objects.all()
    serializer_class = VariaveisAmbienteSerializer

class FilhosExistsView(viewsets.ModelViewSet):
    queryset = FilhosExists.objects.all()
    serializer_class = FilhoSerializer

class ChangePasswordView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = ChangePasswordSerializer

