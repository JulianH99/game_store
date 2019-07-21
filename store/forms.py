from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import StoreUser


class StoreUserCreationForm(UserCreationForm):

    def __init__(self, *args, **kwargs):
        super(StoreUserCreationForm, self).__init__(*args, **kwargs)
        for visible in self.visible_fields():
            visible.field.widget.attrs['class'] = 'input'

    class Meta(UserCreationForm):
        model = StoreUser
        fields = ('username', 'email', 'password1', 'password2', 'age')
        password1 = forms.CharField(widget=forms.PasswordInput())
        password2 = forms.CharField(widget=forms.PasswordInput())


class LoginForm(forms.Form):
    def __init__(self, *args, **kwargs):
        super(LoginForm, self).__init__(*args, **kwargs)
        for visible in self.visible_fields():
            visible.field.widget.attrs['class'] = 'input'

    username = forms.CharField(label='Username')
    password = forms.CharField(label='Password', widget=forms.PasswordInput)


