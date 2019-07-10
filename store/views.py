from django.shortcuts import render
from django.http import HttpResponse
from .forms import UserForm

def index(request):
    hello = 'helloworld'
    context = {'hello': hello}
    return render(request, 'index.html', context)

def newUser(request):

    if request.method == 'POST':
        form = UserForm(request.POST)
        if form.is_valid():
            form.save()
            return render(request, 'index.html')

    form = UserForm()
    return render(request, 'new_user.html', {'form': form})