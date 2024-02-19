from django.contrib import admin
from .models import Car, PurchaseOrder, CustomUser


class CarAdmin(admin.ModelAdmin):
    model = Car
    list_display = ('model_name', 'price', 'quantity_available', 'description')


class PurchaseAdmin(admin.ModelAdmin):
    model = PurchaseOrder
    list_display = ('user', 'car', 'quantity', 'purchase_date', 'total_price', 'purchase_date')


class CustomUserAdmin(admin.ModelAdmin):
    model = CustomUser
    list_display = ('name', 'email', 'is_staff', 'is_active', 'created_at', 'updated_at')


admin.site.register(Car, CarAdmin)
admin.site.register(PurchaseOrder, PurchaseAdmin)
admin.site.register(CustomUser, CustomUserAdmin)
