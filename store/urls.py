from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('user/new', views.new_user, name='new_user'),
    path('user/login', views.login_view, name='login'),
    path('user/<user>/profile', views.user_profile, name='user_profile')
]
