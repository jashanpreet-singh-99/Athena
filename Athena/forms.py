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


class CourseChapterForm(forms.ModelForm):

    class Meta:
        model = CourseChapter
        fields = ['course', 'title', 'visibility', 'files', 'is_streaming', 'video_file']


class CourseQuizForm(forms.ModelForm):
    negative_grade = forms.DecimalField(widget=forms.TextInput, initial=0.5)
    grade = forms.DecimalField(widget=forms.TextInput)
    each_mark = forms.DecimalField(widget=forms.TextInput)
    time = forms.IntegerField(widget=forms.TextInput, initial=10)

    class Meta:
        model = Quiz
        fields = '__all__'


class CourseAssignmentForm(forms.ModelForm):
    grade = forms.DecimalField(widget=forms.TextInput)

    class Meta:
        model = CourseAssignment
        fields = '__all__'


class CourseInPersonExamForm(forms.ModelForm):
    grade = forms.DecimalField(widget=forms.TextInput)

    class Meta:
        model = CourseInPersonExam
        fields = '__all__'


class RatingForm(forms.Form):
    course = forms.ModelChoiceField(queryset=Course.objects.all(), label='')
    rating = forms.DecimalField(label='')
