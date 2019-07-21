from django.db import models
from django.contrib.auth.models import AbstractUser


class StoreUser(AbstractUser):
    age = models.IntegerField(default=0)


class Category(models.Model):
    name = models.CharField(max_length=20)
    description = models.TextField(null=True)


class Game(models.Model):
    name = models.CharField(max_length=20)
    description = models.TextField(null=True)
    # One Category have more Games
    category = models.ManyToManyField(Category)
    users = models.ManyToManyField(StoreUser, through='Score')


class Score(models.Model):
    # One User have more Scores
    user = models.ForeignKey(StoreUser, on_delete=models.CASCADE)
    # One Game have more Scores
    score = models.ForeignKey(Game, on_delete=models.CASCADE)
    # this are atributes for relation
    points = models.IntegerField(default=0)
    time_played = models.IntegerField(default=0)
