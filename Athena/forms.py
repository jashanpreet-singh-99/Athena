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
    course_banner = forms.ImageField(required=False)

    class Meta:
        model = Course
        fields = '__all__'


class CourseCategoriesForm(forms.Form):
    categories_c = forms.ModelChoiceField(queryset=CourseCategories.objects.all(), required=False)


class EnrollmentForm(forms.ModelForm):

    class Meta:
        model = Enrollment
        fields = '__all__'
