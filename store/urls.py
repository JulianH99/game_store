from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('user/new', views.new_user, name='new_user'),
    path('user/login', views.login_view, name='login'),
    path('user/<username>/profile', views.user_profile, name='user_profile'),
    path('user/logout', views.logout_view, name='logout'),
    path('game/<key>', views.game_format, name='game_format'),
    path('embed/<key>', views.game, name='game'),
    path('save/score', views.save_score, name='save_score')
]
