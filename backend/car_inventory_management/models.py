from django.db import models
from datetime import datetime
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    name = models.CharField(max_length=50)
    email = models.EmailField(max_length=50, unique=True)
    password = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(default=datetime.now())
    updated_at = models.DateTimeField(auto_now=True)

    username = None
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []


class Car(models.Model):
    model_name = models.CharField(max_length=50, null=False)
    price = models.IntegerField(null=False)
    description = models.TextField()
    quantity_available = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(default=datetime.now())
    updated_at = models.DateTimeField(auto_now=True)

    def get_latest_cars(self):
        return self.objects.order_by('-created_at')


class PurchaseOrder(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    car = models.ForeignKey(Car, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=0)
    total_price = models.IntegerField(default=0)
    purchase_date = models.DateTimeField(default=datetime.now())
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(default=datetime.now())
    updated_at = models.DateTimeField(auto_now=True)

    def get_all_purchases_by_user(self, user):
        return self.objects.filter(user=user)

    def get_all_purchases_by_decending_order(self):
        return self.objects.order_by('-purchase_date')
