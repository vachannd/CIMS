from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import CustomUser
from .serializers import CustomUserSerializer
import jwt
import datetime
from rest_framework.exceptions import AuthenticationFailed


class RegisterView(APIView):
    def post(self, request):
        serializer = CustomUserSerializer(data=request.data)
        role = request.data.get('role')
        serializer.is_valid(raise_exception=True)
        create_user = CustomUser.objects.create(name=serializer.data['name'], email=serializer.data['email'])
        create_user.role = role
        if role == 'admin':
            create_user.is_staff = True
        create_user.set_password(serializer.data['password'])
        create_user.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = CustomUser.objects.get(email=email)
        if not user:
            raise AuthenticationFailed('User not found')
        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password')
        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }
        token = jwt.encode(payload, 'secret', algorithm='HS256')
        return Response({'token': token, 'id': user.id, 'name': user.name})


class LogoutView(APIView):
    def post(self, request):
        return Response(status=status.HTTP_200_OK)


class UserView(APIView):
    def get(self, request):
        token = request.data.get('token')
        if not token:
            raise AuthenticationFailed('Unauthenticated')
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')
        user = CustomUser.objects.get(id=payload['id'])
        serializer = CustomUserSerializer(user)
        return Response(serializer.data)
