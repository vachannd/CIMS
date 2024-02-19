# serializers.py
from rest_framework import serializers
from .models import CarsModel, CustomUser, PurchaseOrderModel


class AdminCarSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarsModel
        fields = '__all__'

    def to_representation(self, instance):
        list_mode = self.context.get('list_mode', False)

        if list_mode:
            return {'id': instance.id, 'model_name': instance.model_name}

        return super().to_representation(instance)


class UserCarSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarsModel
        fields = ('model_name', 'price', 'description', 'quantity_available', 'year')


class PurchaseOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = PurchaseOrderModel
        fields = '__all__'


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'
