from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator


class Membership(models.Model):
    CHOICES = [
        ('Greater', 'Greater'),
        ('Inter', 'Inter'),
        ('Lesser', 'Lesser'),
        ('Demi', 'Demi')
    ]
    type = models.CharField(choices=CHOICES, max_length=10, default='D', blank=False, null=False, unique=True)
    price = models.PositiveIntegerField()

    def __str__(self):
        return self.type


# Create your models here.
class User(AbstractUser):
    email = models.EmailField(unique=True)
    membership = models.ForeignKey(Membership, on_delete=models.CASCADE, default=1)


class UserProfiles(models.Model):
    username = models.ForeignKey(User, on_delete=models.CASCADE)
    img = models.ImageField(upload_to='profiles/')


# class CourseCategories(models.Model):
#     category = models.CharField(max_length=72)
#
#
# class Course(models.Model):
#     course_title = models.CharField(max_length=255, blank=False, null=False)
#     course_desc = models.TextField(max_length=1024, blank=False, null=False)
#     course_start_date = models.DateField()
#     course_end_date = models.DateField()
#     course_day = models.DateField()
#     course_created = models.DateField()
#     course_rating = models.DecimalField(max_digits=2, decimal_places=1, default=0, validators=[MinValueValidator(0.0),
#                                                                                                MaxValueValidator(5.0)])
#     last_update = models.DateField(auto_now=True)
#     categories = models.ForeignKey(CourseCategories, on_delete=models.CASCADE)
