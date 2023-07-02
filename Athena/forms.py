from django import forms
from .models import *


# class CourseDetailsForm(forms.Form):
#     class Meta:
#         model = Course
#         fields = '__all__'


class UserInfoSettingsForm(forms.ModelForm):

    class Meta:
        model = User
        fields = ['first_name', 'last_name']
        labels = {
            'first_name': 'First Name',
            'last_name': 'Last Name',
        }


class UserProfileForm(forms.ModelForm):

    class Meta:
        model = UserProfiles
        fields = ['user', 'img']
        labels = {'user': '', 'img': ''}
