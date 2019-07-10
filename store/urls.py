from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('user/new', views.newUser, name='new_user')
]