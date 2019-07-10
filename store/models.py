from django.db import models

class User(models.Model):
    user_name = models.CharField(max_length=20)
    password = models.CharField(max_length=200)
    name = models.CharField(max_length=20)
    email = models.EmailField()
    age = models.IntegerField(default=0)

class Category(models.Model):
    name = models.CharField(max_length=20)
    desciption = models.TextField()

class Game(models.Model):
    name = models.CharField(max_length=20)
    description = models.TextField()
    # One Category have more Games
    category = models.ManyToManyField(Category)
    users = models.ManyToManyField(User, through='Score')

class Score(models.Model):
    # One User have more Scores
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    # One Game have more Scores
    score = models.ForeignKey(Game, on_delete=models.CASCADE)
    # this are atributes for relation
    points = models.IntegerField(default=0)
    time_played = models.IntegerField(default=0)
