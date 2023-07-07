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


class UserMembershipForm(forms.ModelForm):
    membership = forms.ModelChoiceField(queryset=Membership.objects.all(), widget=forms.TextInput())

    class Meta:
        model = User
        fields = ['membership']


class CourseCreationForm(forms.ModelForm):
    course_desc = forms.Textarea()

    class Meta:
        model = Course
        fields = '__all__'
