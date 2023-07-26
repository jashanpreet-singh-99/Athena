import re

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

    def clean_first_name(self):
        first_name = self.cleaned_data['first_name']
        if not re.match(r'^[a-zA-Z]+$', first_name):
            raise forms.ValidationError('First name should only contain alphabets.')
        return first_name

    def clean_last_name(self):
        last_name = self.cleaned_data['last_name']
        if not re.match(r'^[a-zA-Z]+$', last_name):
            raise forms.ValidationError('Last name should only contain alphabets.')
        return last_name

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields['first_name'].widget.attrs['id'] = 'firstname'
        self.fields['first_name'].widget.attrs['class'] = 'read-only'
        self.fields['first_name'].widget.attrs['readonly'] = 'readonly'

        self.fields['last_name'].widget.attrs['id'] = 'lastname'
        self.fields['last_name'].widget.attrs['class'] = 'read-only'
        self.fields['last_name'].widget.attrs['readonly'] = 'readonly'


class UserProfileForm(forms.ModelForm):

    class Meta:
        model = UserProfiles
        fields = ['user', 'img']
        labels = {'user': '', 'img': ''}

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields['user'].widget.attrs['style'] = 'display: none;'
        self.fields['img'].widget.attrs['id'] = 'image-input'
        self.fields['img'].widget.attrs['style'] = 'display: none;'


class UserMembershipForm(forms.ModelForm):
    membership = forms.ModelChoiceField(queryset=Membership.objects.all(), widget=forms.TextInput())

    class Meta:
        model = User
        fields = ['membership']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields['membership'].widget.attrs['class'] = 'read-only'
        self.fields['membership'].widget.attrs['readonly'] = 'readonly'
        self.fields['membership'].widget.attrs['style'] = 'display: none;'


class CourseCreationForm(forms.ModelForm):
    course_desc = forms.Textarea()
    course_day = forms.CharField(initial='Non-Repeating')

    class Meta:
        model = Course
        fields = '__all__'

    def clean_course_title(self):
        course_title = self.cleaned_data['course_title']
        if not course_title.isalnum():
            raise forms.ValidationError('Course title should contain only alphabets or numbers.')
        return course_title

    def clean(self):
        cleaned_data = super().clean()
        course_start_date = cleaned_data.get('course_start_date')
        course_end_date = cleaned_data.get('course_end_date')
        if course_start_date and course_end_date and course_start_date >= course_end_date:
            raise forms.ValidationError('Course start date must be earlier than the course end date.')
        return cleaned_data

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields['course_title'].widget.attrs['id'] = 'courseTitle'
        self.fields['course_title'].widget.attrs['class'] = 'input_text'

        self.fields['course_desc'].widget.attrs['id'] = 'courseDesc'
        self.fields['course_desc'].widget.attrs['class'] = 'input_text courseDec'

        self.fields['course_start_date'].widget.attrs['id'] = 'startDate'
        self.fields['course_start_date'].widget.attrs['class'] = 'input_text'
        self.fields['course_start_date'].widget.attrs['readonly'] = 'readonly'

        self.fields['course_end_date'].widget.attrs['id'] = 'endDate'
        self.fields['course_end_date'].widget.attrs['class'] = 'input_text'
        self.fields['course_end_date'].widget.attrs['readonly'] = 'readonly'

        self.fields['categories'].widget.attrs['id'] = 'categories'
        self.fields['categories'].widget.attrs['class'] = 'input_item'
        self.fields['categories'].widget.attrs['style'] = 'display: none;'

        self.fields['course_type'].widget.attrs['id'] = 'courseType'
        self.fields['course_type'].widget.attrs['class'] = 'input_text'

        self.fields['course_difficulty'].widget.attrs['id'] = 'courseDiff'
        self.fields['course_difficulty'].widget.attrs['class'] = 'input_text'

        self.fields['course_day'].widget.attrs['id'] = 'courseDay'
        self.fields['course_day'].widget.attrs['class'] = 'input_text'
        self.fields['course_day'].widget.attrs['readonly'] = 'readonly'

        self.fields['course_banner'].widget.attrs['id'] = 'image-input'
        self.fields['course_banner'].widget.attrs['style'] = 'display: none;'


class CourseCategoriesForm(forms.Form):
    categories_c = forms.ModelChoiceField(queryset=CourseCategories.objects.all(), required=False)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['categories_c'].widget.attrs['id'] = 'categories-c'
        self.fields['categories_c'].widget.attrs['class'] = 'input_item'


class EnrollmentForm(forms.ModelForm):

    class Meta:
        model = Enrollment
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields['user'].widget.attrs['style'] = 'display: none;'
        self.fields['course'].widget.attrs['style'] = 'display: none;'


class CourseChapterForm(forms.ModelForm):

    class Meta:
        model = CourseChapter
        fields = ['course', 'title', 'visibility', 'files', 'is_streaming', 'video_file']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields['course'].widget.attrs['style'] = 'display: none;'
        self.fields['title'].widget.attrs['class'] = 'input-fields large chapter-title-f'

        self.fields['visibility'].widget.attrs['id'] = 'chapter-visibility'
        self.fields['visibility'].widget.attrs['style'] = 'display: none;'

        self.fields['files'].widget.attrs['id'] = 'files-to-upload'
        self.fields['files'].widget.attrs['class'] = 'video-file-block'
        self.fields['files'].widget.attrs['type'] = 'file'
        self.fields['files'].widget.attrs['accept'] = '.pdf'

        self.fields['is_streaming'].widget.attrs['id'] = 'is_streaming_check'
        self.fields['is_streaming'].widget.attrs['style'] = 'display: none;'

        self.fields['video_file'].widget.attrs['id'] = 'video_file_block'
        self.fields['video_file'].widget.attrs['class'] = 'video-file-block'
        self.fields['video_file'].widget.attrs['type'] = 'file'
        self.fields['video_file'].widget.attrs['accept'] = '.mp4'


class CourseQuizForm(forms.ModelForm):
    negative_grade = forms.DecimalField(widget=forms.TextInput, initial=0.5)
    grade = forms.DecimalField(widget=forms.TextInput)
    each_mark = forms.DecimalField(widget=forms.TextInput)
    time = forms.IntegerField(widget=forms.TextInput, initial=10)

    class Meta:
        model = Quiz
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields['course'].widget.attrs['style'] = 'display: none;'
        self.fields['title'].widget.attrs['class'] = 'input-fields large chapter-title-f'

        self.fields['visibility'].widget.attrs['id'] = 'quiz-visibility'
        self.fields['visibility'].widget.attrs['style'] = 'display: none;'

        self.fields['negative_marking'].widget.attrs['id'] = 'quiz-negative-marking'
        self.fields['negative_marking'].widget.attrs['style'] = 'display: none;'
        self.fields['negative_grade'].widget.attrs['id'] = 'negative_grade'
        self.fields['negative_grade'].widget.attrs['class'] = 'input-fields small chapter-title-f'
        self.fields['negative_grade'].widget.attrs['hidden'] = 'hidden'

        self.fields['time'].widget.attrs['id'] = 'quiz_time'
        self.fields['time'].widget.attrs['class'] = 'input-fields medium chapter-title-f'

        self.fields['instructions'].widget.attrs['class'] = 'input-text'

        self.fields['files'].widget.attrs['id'] = 'video_file_block'
        self.fields['files'].widget.attrs['class'] = 'video-file-block'
        self.fields['files'].widget.attrs['type'] = 'file'
        self.fields['files'].widget.attrs['accept'] = '.txt'

        self.fields['grade'].widget.attrs['class'] = 'input-fields medium chapter-title-f'
        self.fields['each_mark'].widget.attrs['class'] = 'input-fields medium chapter-title-f'


class CourseAssignmentForm(forms.ModelForm):
    grade = forms.DecimalField(widget=forms.TextInput)

    class Meta:
        model = CourseAssignment
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields['course'].widget.attrs['style'] = 'display: none;'
        self.fields['title'].widget.attrs['class'] = 'input-fields large chapter-title-f'

        self.fields['deadline'].widget.attrs['id'] = 'deadline-input'
        self.fields['deadline'].widget.attrs['class'] = 'input-fields chapter-title-f'
        self.fields['deadline'].widget.attrs['readonly'] = 'readonly'

        self.fields['visibility'].widget.attrs['id'] = 'ass-visibility'
        self.fields['visibility'].widget.attrs['style'] = 'display: none;'

        self.fields['plagiarism_check'].widget.attrs['id'] = 'plagiarism_check'
        self.fields['plagiarism_check'].widget.attrs['style'] = 'display: none;'

        self.fields['instructions'].widget.attrs['class'] = 'input-text'
        self.fields['file'].widget.attrs['class'] = 'video-file-block'
        self.fields['file'].widget.attrs['type'] = 'file'
        self.fields['file'].widget.attrs['accept'] = '.pdf'

        self.fields['grade'].widget.attrs['class'] = 'input-fields medium chapter-title-f'


class CourseInPersonExamForm(forms.ModelForm):
    grade = forms.DecimalField(widget=forms.TextInput)

    class Meta:
        model = CourseInPersonExam
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields['course'].widget.attrs['style'] = 'display: none;'
        self.fields['title'].widget.attrs['class'] = 'input-fields large chapter-title-f'

        self.fields['exam_date'].widget.attrs['id'] = 'exam_date-input'
        self.fields['exam_date'].widget.attrs['class'] = 'input-fields chapter-title-f'
        self.fields['exam_date'].widget.attrs['readonly'] = 'readonly'

        self.fields['grade'].widget.attrs['class'] = 'input-fields medium chapter-title-f'


class RatingForm(forms.Form):
    course = forms.ModelChoiceField(queryset=Course.objects.all(), label='')
    rating = forms.DecimalField(label='')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields['course'].widget.attrs['style'] = 'display: none;'
        self.fields['rating'].widget.attrs['id'] = 'rating_input'
        self.fields['rating'].widget.attrs['style'] = 'display: none;'


class QuizContentForm(forms.ModelForm):
    LIST_CHOICES = [
        (1, 'Option 1'),
        (2, 'Option 2'),
        (3, 'Option 3'),
        (4, 'Option 4'),
    ]
    answers = forms.ChoiceField(choices=LIST_CHOICES)
    type = forms.BooleanField(required=False)
    id = forms.IntegerField(required=False)

    class Meta:
        model = QuizContent
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        # Set custom styles and attributes for the widgets
        self.fields['course'].widget.attrs['style'] = 'display: none'
        self.fields['quiz'].widget.attrs['style'] = 'display: none'
        self.fields['id'].widget.attrs['style'] = 'display: none'
        self.fields['type'].widget.attrs['class'] = 'checkbox'
        self.fields['question'].widget.attrs['id'] = 'question-input'
        self.fields['question'].widget.attrs['class'] = 'input-q'

        self.fields['options_1'].widget.attrs['id'] = 'option1-input'
        self.fields['options_1'].widget.attrs['class'] = 'input-q'

        self.fields['options_2'].widget.attrs['id'] = 'option2-input'
        self.fields['options_2'].widget.attrs['class'] = 'input-q'

        self.fields['options_3'].widget.attrs['id'] = 'option3-input'
        self.fields['options_3'].widget.attrs['class'] = 'input-q'

        self.fields['options_4'].widget.attrs['id'] = 'option4-input'
        self.fields['options_4'].widget.attrs['class'] = 'input-q'

        self.fields['answers'].widget.attrs['id'] = 'answers-input'
        self.fields['answers'].widget.attrs['class'] = 'input-q'


class SubmitForm(forms.ModelForm):

    class Meta:
        model = AssignmentSubmission
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['user'].widget.attrs['style'] = 'display: none'
        self.fields['assignment'].widget.attrs['id'] = 'assignment-submission-id'
        self.fields['assignment'].widget.attrs['style'] = 'display: none'
        self.fields['file'].widget.attrs['class'] = 'submission-file-block'
        self.fields['file'].widget.attrs['type'] = 'file'
        self.fields['file'].widget.attrs['accept'] = '.txt'


class ExamGradeForm(forms.Form):
    user = forms.ModelChoiceField(queryset=User.objects.all())
    grade = forms.DecimalField(widget=forms.TextInput)

    grade.widget.attrs['id'] = 'scored_exam_grade_input'
    grade.widget.attrs['class'] = 'input-fields small marg-r gradeField'
    grade.widget.attrs['readonly'] = 'readonly'

    def clean_grade(self):
        grade = self.cleaned_data.get('grade')
        user = self.cleaned_data.get('user')

        if user and grade is not None:
            grade_obj = Grade.objects.get_or_create(user=user)[0]
            if grade > grade_obj.total_grade:
                raise forms.ValidationError("Grade cannot exceed the total grade for this user.")

        return grade


class CourseSearchForm(forms.Form):
    search = forms.CharField(required=False)
    # start_date = forms.DateField(required=False)
    # end_date = forms.DateField(required=False)
    categories = forms.CharField(required=False)
    rating = forms.DecimalField(required=False, max_digits=2, decimal_places=1)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields['search'].widget.attrs['class'] = 'input_text'
        self.fields['categories'].widget.attrs['class'] = 'input_text'
        self.fields['rating'].widget.attrs['class'] = 'input_text small'

