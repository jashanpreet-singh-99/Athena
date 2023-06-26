from django.urls import path
from Athena import views
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

urlpatterns = [
    path('', views.Dash.as_view(), name='home_page'),
    path('dash', views.Dash.as_view(), name='dash_page'),
    path('course', views.Courses.as_view(), name='course_page'),
    path('chat', views.Chat.as_view(), name='chat_page'),
    path('schedule', views.Schedule.as_view(), name='schedule_page'),
    path('deadlines', views.Deadlines.as_view(), name='deadlines_page'),
    path('settings', views.Settings.as_view(), name='settings_page'),
    path('login', views.Login.as_view(), name='login_page'),
    path('logout', views.Logout.as_view(), name='logout_page'),
    path('signup', views.Signup.as_view(), name='signup_page')
]

urlpatterns += staticfiles_urlpatterns()
