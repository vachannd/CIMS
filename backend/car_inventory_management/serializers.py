# serializers.py
from rest_framework import serializers
from .models import Car, CustomUser, PurchaseOrder


class AdminCarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = '__all__'

    def to_representation(self, instance):
        list_mode = self.context.get('list_mode', False)

        if list_mode:
            return {'id': instance.id, 'model_name': instance.model_name}

        return super().to_representation(instance)


class UserCarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = ('model_name', 'price', 'description', 'quantity_available')


class PurchaseOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = PurchaseOrder
        fields = '__all__'


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'
