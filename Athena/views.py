from django.shortcuts import render, redirect
from django.views import View
from django.contrib.auth import get_user_model, authenticate, login, logout


# Create your views here.
class Dash(View):

    def get(self, request):
        context = {'title': 'Dashboard'}
        return render(request, 'Athena/dash_page.html', context)


class Courses(View):

    def get(self, request):
        context = {'title': 'Courses'}
        return render(request, 'Athena/course_page.html', context)


class Chat(View):
    def get(self, request):
        context = {'title': 'Messages'}
        return render(request, 'Athena/chat_page.html', context)


class Schedule(View):

    def get(self, request):
        context = {'title': 'Schedule'}
        return render(request, 'Athena/schedule_page.html', context)


class Deadlines(View):

    def get(self, request):
        context = {'title': 'Deadlines'}
        return render(request, 'Athena/deadlines_page.html', context)


class Settings(View):

    def get(self, request):
        context = {'title': 'Settings'}
        return render(request, 'Athena/settings_page.html', context)


class Login(View):

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


class Logout(View):

    def get(self, request):
        logout(request)
        return redirect('login_page')


class Signup(View):
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
