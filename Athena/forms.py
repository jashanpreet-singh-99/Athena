from django import forms
from .models import *


# class CourseDetailsForm(forms.Form):
#     class Meta:
#         model = Course
#         fields = '__all__'


class UserProfileForm(forms.Form):

    class Meta:
        model = UserProfiles
        fields = '__all__'
