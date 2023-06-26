from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class User(AbstractUser):
    email = models.EmailField(unique=True)


class UserProfiles(models.Model):
    username = models.ForeignKey(User, on_delete=models.CASCADE)
    img = models.ImageField(upload_to='profiles/')
