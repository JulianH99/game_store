from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin
from .forms import StoreUserCreationForm
from .models import *


class StoreUserAdmin(UserAdmin):
    add_form = StoreUserCreationForm
    model = StoreUser
    list_display = ['username', 'email', 'first_name', 'age']


admin.site.register(StoreUser, StoreUserAdmin)
admin.site.register(Category)
admin.site.register(Game)
