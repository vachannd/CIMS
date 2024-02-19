from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Car, CustomUser, PurchaseOrder
from .serializers import AdminCarSerializer, CustomUserSerializer, PurchaseOrderSerializer, UserCarSerializer
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
        # user = CustomUser.objects.get(id=payload['id'])
        # serializer = CustomUserSerializer(user)
        user_purchases = PurchaseOrder.objects.filter(user=payload['id'])
        purchase_serializer = PurchaseOrderSerializer(user_purchases, many=True)
        return Response({
            'id': payload['id'],
            'message': "Welcome to the dashboard!",
            'purchases': purchase_serializer.data
        })


class CreateCarModelView(APIView):
    def post(self, request):
        serializer = AdminCarSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class CarListView(APIView):
    def get(self, request):
        token = request.data.get('token')
        if not token:
            raise AuthenticationFailed('Unauthenticated')
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')
        current_cars = Car.objects.order_by('-created_at')
        serializer = UserCarSerializer(current_cars, many=True)
        return Response(serializer.data)


class AdminCarListView(APIView):
    def get(self, request):
        token = request.data.get('token')
        if not token:
            raise AuthenticationFailed('Unauthenticated')
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')
        user = CustomUser.objects.get(id=payload['id'])
        if not user.is_staff:
            raise AuthenticationFailed('Unauthorized')
        current_cars = Car.objects.order_by('-created_at')
        serializer = AdminCarSerializer(current_cars, many=True, context={'list_mode': False})
        return Response(serializer.data)


class AdminPurchaseView(APIView):
    def get(self, request):
        token = request.data.get('token')
        if not token:
            raise AuthenticationFailed('Unauthenticated')
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')
        user = CustomUser.objects.get(id=payload['id'])
        if not user.is_staff:
            raise AuthenticationFailed('Unauthorized')
        all_purchases = PurchaseOrder.objects.all().order_by('-purchase_date')
        serializer = PurchaseOrderSerializer(all_purchases, many=True)
        return Response(serializer.data)


class AdminCarModelView(APIView):
    def get(self, request):
        car_models = Car.objects.all()
        serializer = AdminCarSerializer(car_models, many=True, context={'list_mode': True})
        return Response(serializer.data)


class AddMoreCarsView(APIView):
    def post(self, request):
        token = request.data.get('token')
        if not token:
            raise AuthenticationFailed('Unauthenticated')
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')
        user = CustomUser.objects.get(id=payload['id'])
        if not user.is_staff:
            raise AuthenticationFailed('Unauthorized')

        quantity = request.data.get('quantity')
        if not quantity:
            return Response({'error': 'Quantity is required in the request data'}, status=status.HTTP_400_BAD_REQUEST)

        car_model_id = request.data.get('car_model_id')
        car = Car.objects.filter(id=car_model_id)
        if not car:
            return Response({'message': 'Car model with the specified ID does not exist'}, status=status.HTTP_404_NOT_FOUND)

        car.update(quantity=car.quantity + request.data.get('quantity'))
        return Response(status=status.HTTP_200_OK)
