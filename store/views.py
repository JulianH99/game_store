from django.shortcuts import render, redirect, reverse
from django.contrib.auth import login, authenticate
from django.contrib import messages
from .forms import StoreUserCreationForm, LoginForm


def index(request):
    hello = 'helloworld'
    context = {'hello': hello}
    return render(request, 'index.html', context)


def new_user(request):
    if request.method == 'POST':
        form = StoreUserCreationForm(request.POST)
        print(form.is_valid(), form.errors)
        if form.is_valid():
            form.save()
            user = authenticate(request, username=form.cleaned_data['username'], password=form.cleaned_data['password1'])
            if user is not None:
                login(request, user)
                return redirect(reverse('user_profile', kwargs={'user': user}))
            else:
                messages.warning(request, 'An error occurred when login you')

    form = StoreUserCreationForm()
    return render(request, 'new_user.html', {'form': form})


def login_view(request):
    if request.method == 'POST':
        login_form = LoginForm(request.POST)

        if login_form.is_valid():
            username = login_form.data['username']
            password = login_form.data['password']

            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect(reverse('user_profile', kwargs={'user': username}))
            else:
                messages.error(request, 'Invalid username/password')

    else:
        login_form = LoginForm()

    return render(request, 'login.html', {'form': login_form})


def user_profile(request, user):

    return render(request, 'profile.html', {
        'user': user
    })
