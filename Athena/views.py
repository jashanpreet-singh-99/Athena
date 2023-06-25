from django.shortcuts import render
from django.views import View


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
        return render(request, 'Athena/login.html')

