from django.shortcuts import render, redirect
from django.urls import reverse
from django import views
from django.contrib.auth import get_user_model, authenticate, login, logout
from .forms import *
from .models import *

from datetime import datetime


def load_profile(context, request):
    user = request.user
    if user.is_authenticated:
        try:
            old_profile = UserProfiles.objects.get(user=user)
            context['profile_img'] = old_profile.img
        except UserProfiles.DoesNotExist:
            print('No User profile_img present')
        return context
    return context


# Create your views here.
class Dash(views.View):

    def get(self, request):
        context = {'title': 'Dashboard'}
        load_profile(context, request)
        return render(request, 'Athena/dash_page.html', context)


class Courses(views.View):

    def get(self, request):
        context = {'title': 'Courses'}
        load_profile(context, request)

        trending_courses = Course.objects.order_by('-course_rating')[:5]
        context['t_courses'] = trending_courses
        # print(trending_courses)
        # [print(x.course_title, x.course_rating) for x in trending_courses]
        my_courses = Course.objects.filter(author=request.user)
        context['my_courses'] = my_courses
        return render(request, 'Athena/course_page.html', context)


class Chat(views.View):
    def get(self, request):
        context = {'title': 'Messages'}
        load_profile(context, request)
        return render(request, 'Athena/chat_page.html', context)


class Schedule(views.View):

    def get(self, request):
        context = {'title': 'Schedule'}
        load_profile(context, request)
        return render(request, 'Athena/schedule_page.html', context)


class Deadlines(views.View):

    def get(self, request):
        context = {'title': 'Deadlines'}
        load_profile(context, request)
        return render(request, 'Athena/deadlines_page.html', context)


class Settings(views.View):

    def get(self, request):
        user = request.user
        initial_data = {'user': user}
        initial_data_u = {
            'first_name': user.first_name,
            'last_name': user.last_name,
        }
        initial_data_m = {'membership': user.membership}

        # User Profile Form
        form = UserProfileForm(initial=initial_data)

        # to manage image selection using custom button
        form.fields['user'].widget.attrs['style'] = 'display: none;'
        form.fields['img'].widget.attrs['id'] = 'image-input'
        form.fields['img'].widget.attrs['style'] = 'display: none;'

        context = {'title': 'Settings', 'form': form}
        # load profile image if present
        load_profile(context, request)

        # User info Form
        u_form = UserInfoSettingsForm(initial=initial_data_u)

        u_form.fields['first_name'].widget.attrs['id'] = 'firstname'
        u_form.fields['first_name'].widget.attrs['class'] = 'read-only'
        u_form.fields['first_name'].widget.attrs['readonly'] = 'readonly'

        u_form.fields['last_name'].widget.attrs['id'] = 'lastname'
        u_form.fields['last_name'].widget.attrs['class'] = 'read-only'
        u_form.fields['last_name'].widget.attrs['readonly'] = 'readonly'

        context['u_form'] = u_form

        # Membership Form
        m_form = UserMembershipForm(initial=initial_data_m)

        m_form.fields['membership'].widget.attrs['id'] = 'membership'
        m_form.fields['membership'].widget.attrs['class'] = 'read-only'
        m_form.fields['membership'].widget.attrs['readonly'] = 'readonly'
        m_form.fields['membership'].widget.attrs['style'] = 'display: none;'

        context['m_form'] = m_form

        # Pass list of all Memberships available
        memberships_list = Membership.objects.all()
        context['membership_list'] = memberships_list

        # Pass Membership Features
        feature_list = MemberFeatures.objects.all()
        context['features_list'] = feature_list

        mm_form = UserMembershipForm(initial=initial_data_m)

        mm_form.fields['membership'].widget.attrs['id'] = 'membership-buy-selection'
        mm_form.fields['membership'].widget.attrs['class'] = 'read-only'
        mm_form.fields['membership'].widget.attrs['readonly'] = 'readonly'
        mm_form.fields['membership'].widget.attrs['style'] = 'display: none;'

        context['mm_form'] = mm_form

        return render(request, 'Athena/settings_page.html', context)


class CourseBuilder(views.View):

    def get(self, request):
        context = {'title': 'Course Builder'}

        form = CourseCreationForm()

        form.fields['course_title'].widget.attrs['id'] = 'courseTitle'
        form.fields['course_title'].widget.attrs['class'] = 'input_text'

        form.fields['course_desc'].widget.attrs['id'] = 'courseDesc'
        form.fields['course_desc'].widget.attrs['class'] = 'input_text courseDec'

        form.fields['course_start_date'].widget.attrs['id'] = 'startDate'
        form.fields['course_start_date'].widget.attrs['class'] = 'input_text'
        form.fields['course_start_date'].widget.attrs['readonly'] = 'readonly'

        form.fields['course_end_date'].widget.attrs['id'] = 'endDate'
        form.fields['course_end_date'].widget.attrs['class'] = 'input_text'
        form.fields['course_end_date'].widget.attrs['readonly'] = 'readonly'

        form.fields['categories'].widget.attrs['id'] = 'categories'
        form.fields['categories'].widget.attrs['class'] = 'input_item'
        form.fields['categories'].widget.attrs['style'] = 'display: none;'

        form.fields['course_type'].widget.attrs['id'] = 'courseType'
        form.fields['course_type'].widget.attrs['class'] = 'input_text'

        form.fields['course_difficulty'].widget.attrs['id'] = 'courseDiff'
        form.fields['course_difficulty'].widget.attrs['class'] = 'input_text'

        form.fields['course_day'].widget.attrs['id'] = 'courseDay'
        form.fields['course_day'].widget.attrs['class'] = 'input_text'
        form.fields['course_day'].widget.attrs['readonly'] = 'readonly'

        form.fields['course_banner'].widget.attrs['id'] = 'image-input'
        form.fields['course_banner'].widget.attrs['style'] = 'display: none;'

        context['form'] = form

        c_form = CourseCategoriesForm()
        c_form.fields['categories_c'].widget.attrs['id'] = 'categories-c'
        c_form.fields['categories_c'].widget.attrs['class'] = 'input_item'

        context['c_form'] = c_form

        load_profile(context, request)
        return render(request, 'Athena/course_builder_page.html', context)

    def post(self, request):
        context = {'title': 'Course Builder'}
        print(request.POST)
        request.POST = request.POST.copy()
        request.POST['author'] = request.user
        request.POST['course_created'] = datetime.now().strftime("%m/%d/%Y")
        request.POST['course_rating'] = 0
        print(request.POST)
        form = CourseCreationForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            msg = '%s \n Course creation has been successfully' % (form.cleaned_data['course_title'])
            error = False
        else:
            msg = 'Error while validating Course Information.'
            error = True
            context['error_msg'] = form.errors.as_data()
        context['msg'] = msg
        context['error'] = error
        context['form'] = form
        return render(request, 'Athena/course_build_completed.html', context)


class Login(views.View):

    def get(self, request):
        context = {'title': 'Login'}
        return render(request, 'Athena/login.html', context)

    def post(self, request):
        email = request.POST['email']
        password = request.POST['password']
        print("Login :", email, password)
        User = get_user_model()
        try:
            user_e = User.objects.get(email__exact=email)
        except User.DoesNotExist as e:
            print('New user, redirect to signin page')
            return redirect('signup_page')
        else:
            print(user_e.username)
            user = authenticate(request, username=user_e.username, password=password)
            if user is not None:
                login(request, user)
                print('Opening dashboard for the user {}'.format(user_e.username))
                return redirect('dash_page')
            else:
                print('Login password combination incorrect')
                return redirect('login_page')


class Logout(views.View):

    def get(self, request):
        logout(request)
        return redirect('login_page')


class Signup(views.View):
    def get(self, request):
        return render(request, 'Athena/signup.html')

    def post(self, request):
        first_name = request.POST['first_name']
        last_name = request.POST['last_name']
        email = request.POST['email']
        password = request.POST['password']
        v_password = request.POST['v_password']
        '''
        User name checks are pending
        check for invalid char in first and lasy name
        send signal if incorrect password
        verify the username and email is unique in the system, handle if error thrown
        '''
        if password != v_password:
            return render(request, 'Athena/signup.html', context={'Error': 'Password Verification'})
        User = get_user_model()
        user = User.objects.create_user(username=(first_name+last_name), email=email, password=password,
                                        first_name=first_name, last_name=last_name)
        if user is not None:
            login(request, user)
            return redirect('dash_page')
        else:
            return render(request, 'Athena/signup.html')


class UploadProfile(views.View):

    def post(self, request):
        user = request.user
        try:
            old_profile = UserProfiles.objects.get(user=user)
            form = UserProfileForm(request.POST, request.FILES, instance=old_profile)
        except UserProfiles.DoesNotExist:
            form = UserProfileForm(request.POST, request.FILES)
        if form.is_valid():
            print('Valid form : ', request.FILES)
            form.save()
        else:
            print('Invalid Form Data:', request.POST)
        return redirect('settings_page')


class UpdateUserName(views.View):

    def post(self, request):
        user = request.user
        old_user_data = User.objects.get(username=user.username)
        form = UserInfoSettingsForm(request.POST, instance=old_user_data)
        if form.is_valid():
            print('Valid form : ', request.POST)
            form.save()
        else:
            print('InValid form : ', request.POST)
        return redirect('settings_page')


class UpdateMembership(views.View):

    def post(self, request):
        user = request.user
        old_user_data = User.objects.get(username=user.username)
        membership = Membership.objects.get(pk=request.POST['membership'])
        form = UserMembershipForm(request.POST, instance=old_user_data)
        form.fields['membership'].initial = membership
        if form.is_valid():
            print('Valid form: ', request.POST)
            form.save()
        else:
            print('Invalid User membership')
        return redirect('settings_page')


class CancelMembership(views.View):

    def post(self, request):
        user = request.user
        old_user_data = User.objects.get(username=user.username)
        membership = Membership.objects.get(pk=1)
        form = UserMembershipForm({'membership': membership}, instance=old_user_data)
        if form.is_valid():
            old_user_data.save()
            print('Valid form: ', request.POST)
        else:
            print('Invalid User membership')
        return redirect('settings_page')


class CourseDetails(views.View):

    def get(self, request, course_id):
        context = {'title': 'Course Details'}
        load_profile(context, request)
        course = Course.objects.get(id=course_id)
        author_profile = UserProfiles.objects.get(user=course.author)
        context['course'] = course
        context['author_profile'] = author_profile.img

        # Current User course details
        try:
            e_obj = Enrollment.objects.get(user=request.user, course=course)
        except Enrollment.DoesNotExist:
            e_obj = None
        context['e_obj'] = e_obj

        # All enrollment details
        enrollment_info = Enrollment.objects.filter(course=course)
        context['e_info'] = enrollment_info

        e_data = {
            'user': request.user,
            'course': course
        }
        e_form = EnrollmentForm(initial=e_data)

        e_form.fields['user'].widget.attrs['style'] = 'display: none;'
        e_form.fields['course'].widget.attrs['style'] = 'display: none;'

        context['e_form'] = e_form

        return render(request, 'Athena/course_details_page.html', context)


class EnrollCourse(views.View):

    def post(self, request):
        context = {}
        e_form = EnrollmentForm(request.POST)
        if e_form.is_valid():
            e_form.save()
            return redirect(reverse('course_details_page', args=[e_form.cleaned_data['course'].id]))
        else:
            return redirect('course_page')
