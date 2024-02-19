from django.urls import path

from .views import AddMoreCarsView, AdminCarListView, AdminCarModelView, AdminPurchaseView, CarListView, CreateCarModelView, LoginView, LogoutView, RegisterView, UserView


urlpatterns = [
    path('register', RegisterView.as_view()),
    path('login', LoginView.as_view()),
    path('user', UserView.as_view()),
    path('logout', LogoutView.as_view()),
    path('add_car_model', CreateCarModelView.as_view()),
    path('get_car_details_for_admin', AdminCarListView.as_view()),
    path('get_latest_cars', CarListView.as_view()),
    path('get_all_purchases', AdminPurchaseView.as_view()),
    path('get_all_car_models', AdminCarModelView.as_view()),
    path('add_more_cars', AddMoreCarsView.as_view()),
]
