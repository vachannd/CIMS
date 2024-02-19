from django.contrib import admin
from .models import CarsModel, PurchaseOrderModel, CustomUser


class CarAdmin(admin.ModelAdmin):
    model = CarsModel
    list_display = ('model_name', 'price', 'quantity_available', 'description')


class PurchaseAdmin(admin.ModelAdmin):
    model = PurchaseOrderModel
    list_display = ('user', 'car', 'quantity', 'purchase_date', 'total_price', 'purchase_date')


class CustomUserAdmin(admin.ModelAdmin):
    model = CustomUser
    list_display = ('name', 'email', 'is_staff', 'is_active', 'created_at', 'updated_at')


admin.site.register(CarsModel, CarAdmin)
admin.site.register(PurchaseOrderModel, PurchaseAdmin)
admin.site.register(CustomUser, CustomUserAdmin)
