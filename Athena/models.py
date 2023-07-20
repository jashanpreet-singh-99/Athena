from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator


# Define custom path form files for each user
def user_directory_path(instance, filename):
    return f'user_{instance.user.username}/{filename}'


def user_directory_path_course(instance, filename):
    return f'user_{instance.author.username}/{filename}'


def course_directory_path(instance, filename):
    return f'course_{instance.course.id}/{filename}'


class MemberFeatures(models.Model):
    name = models.CharField(max_length=255)
    details = models.TextField(max_length=1024)
    min = models.PositiveIntegerField()


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
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    img = models.ImageField(upload_to=user_directory_path)

    def __str__(self):
        return self.user.username


class CourseCategories(models.Model):
    category = models.CharField(max_length=72)

    def __str__(self):
        return self.category

    class Meta:
        ordering = ['category']


class Course(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    course_title = models.CharField(max_length=255, blank=False, null=False)
    course_desc = models.TextField(max_length=1024, blank=False, null=False)
    course_start_date = models.DateField()
    course_end_date = models.DateField()
    course_day = models.CharField(max_length=14, blank=True, null=True)
    course_created = models.DateField()
    course_rating = models.DecimalField(max_digits=2, decimal_places=1, default=0, validators=[MinValueValidator(0.0),
                                                                                               MaxValueValidator(5.0)])
    last_update = models.DateField(auto_now=True)
    categories = models.CharField(max_length=512, blank=False, null=False, default='')

    TYPE_CHOICES = [
        ('V', 'Virtual'),
        ('I', 'In-Person')
    ]

    course_type = models.CharField(max_length=1, choices=TYPE_CHOICES, default='I', null=True)

    DIF_CHOICES = [
        ('A', 'Advanced'),
        ('I', 'Intermediate'),
        ('B', 'Beginner')
    ]

    course_difficulty = models.CharField(max_length=1, choices=DIF_CHOICES, default='B', null=False)

    course_banner = models.ImageField(upload_to=user_directory_path_course)

    def __str__(self):
        return self.course_title + '_' + str(self.author.username)


class Enrollment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.user.username + '_' + str(self.course.id)

    class Meta:
        unique_together = ['user', 'course']


class CourseChapter(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    visibility = models.BooleanField(default=True)
    files = models.FileField(upload_to=course_directory_path, blank=True)
    is_streaming = models.BooleanField(default=False)
    video_file = models.FileField(upload_to=course_directory_path, blank=True)


class Quiz(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    visibility = models.BooleanField(default=True)
    time = models.PositiveIntegerField()
    each_mark = models.DecimalField(max_digits=4, decimal_places=2, default=1.0)
    grade = models.DecimalField(max_digits=4, decimal_places=2)
    negative_marking = models.BooleanField(default=False)
    negative_grade = models.DecimalField(max_digits=4, decimal_places=2, default=0.5)
    instructions = models.TextField(max_length=1024)
    files = models.FileField(upload_to=course_directory_path, blank=True)


class QuizContent(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    question = models.CharField(max_length=512)
    options_1 = models.CharField(max_length=256)
    options_2 = models.CharField(max_length=256)
    options_3 = models.CharField(max_length=256)
    options_4 = models.CharField(max_length=256)
    answers = models.PositiveIntegerField()


class StudentQuizSubmission(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    question = models.ForeignKey(QuizContent, on_delete=models.CASCADE)
    submission = models.PositiveIntegerField()
    submitted_at = models.DateField(auto_now_add=True)
