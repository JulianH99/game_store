from django.shortcuts import render, redirect, reverse
from django.contrib.auth import login, authenticate, logout
from django.contrib import messages
from .forms import StoreUserCreationForm, LoginForm
from .models import *
from django.http import JsonResponse


def index(request):
    games = Game.objects.all()
    return render(request, 'index.html', {
        'games': games
    })


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

    return render(request, 'profile.html')


def logout_view(request):
    logout(request)
    return redirect(reverse('index'))


def game_format(request, key):
    game = Game.objects.get(key=key)
    scores = Score.objects.filter(score=game.id)
    for x in scores:
        print(x.game)
    return render(request, 'game_format.html', {
        'game': game,
        'scores': scores
    })


def game(request, key):
    game = Game.objects.get(key=key)
    path = 'games/' + key + '.html'
    return render(request, path, {
        'game': game
    })


def save_score(request):
    id = request.GET.get('id_user')
    key = request.GET.get('key_name')
    score = request.GET.get('score')
    user = StoreUser.objects.get(pk=id)
    game = Game.objects.get(key=key)
    try:
        relation = Score.objects.get(score=game, user=user)
        if int(relation.points) > int(score):
            relation.points = score
    except:
        relation = Score(user=user, score=game, points=score)

    relation.save()
    return JsonResponse('succesful')