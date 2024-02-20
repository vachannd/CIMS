from django.db import models
from datetime import datetime
from django.contrib.auth.models import AbstractUser


from django.contrib.auth.models import BaseUserManager
from django.utils import timezone

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)


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

    objects = CustomUserManager()


class CarsModel(models.Model):
    model_name = models.CharField(max_length=50, null=False)
    price = models.IntegerField(null=False)
    year = models.IntegerField(null=False)
    description = models.TextField(default='')
    quantity_available = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(default=datetime.now())
    updated_at = models.DateTimeField(auto_now=True)


class PurchaseOrderModel(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    car = models.ForeignKey(CarsModel, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=0)
    total_price = models.IntegerField(default=0)
    purchase_date = models.DateTimeField(default=datetime.now())
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(default=datetime.now())
    updated_at = models.DateTimeField(auto_now=True)
