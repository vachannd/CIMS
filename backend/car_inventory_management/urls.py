from django.urls import path

from .views import AddMoreCarsView, CarModelView, PurchaseOrdersView, CarListView, CreateCarModelView, LoginView, LogoutView, PurchaseCarView, RegisterView, UserView


urlpatterns = [
    path('register', RegisterView.as_view()),
    path('login', LoginView.as_view()),
    path('user', UserView.as_view()),
    path('logout', LogoutView.as_view()),
    path('addCarModel', CreateCarModelView.as_view()),
    path('getLatestCars', CarListView.as_view()),
    path('getAllPurchases', PurchaseOrdersView.as_view()),
    path('getCarModels', CarModelView.as_view()),
    path('addMoreCars', AddMoreCarsView.as_view()),
    path('purchaseCar', PurchaseCarView.as_view()),
]
