from django.db import models
from django import template
from django.contrib.auth.models import AbstractUser

register = template.Library()


class StoreUser(AbstractUser):
    age = models.IntegerField(default=0)


class Category(models.Model):
    name = models.CharField(max_length=20)
    description = models.TextField(null=True)

    def __str__(self):
        return self.name


class Game(models.Model):
    name = models.CharField(max_length=20)
    key = models.CharField(max_length=20, null=True)
    description = models.TextField(null=True)
    image = models.FileField(upload_to='uploads/', null=True)
    # One Category have more Games
    category = models.ManyToManyField(Category)
    users = models.ManyToManyField(StoreUser, through='Score')

    @register.filter
    def get_score(self, user_id):
        return Score.objects.filter(user__id=user_id, score__id=self.id)

    def __str__(self):
        return self.key


class Score(models.Model):
    # One User have more Scores
    user = models.ForeignKey(StoreUser, on_delete=models.CASCADE)
    # One Game have more Scores
    score = models.ForeignKey(Game, on_delete=models.CASCADE)
    # this are atributes for relation
    points = models.IntegerField(default=0)
    time_played = models.IntegerField(default=0)

    @register.filter
    def get_score(self, user_id):
        return Score.objects.filter(user__id=user_id)
