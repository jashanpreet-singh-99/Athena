from django.urls import path
from Athena import views
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf.urls.static import static
from django.conf import settings

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
    path('signup', views.Signup.as_view(), name='signup_page'),
    path('upload_profile', views.UploadProfile.as_view(), name='upload_profile_page'),
    path('update_user_name', views.UpdateUserName.as_view(), name='update_user_name'),
    path('update_user_membership', views.UpdateMembership.as_view(), name='update_user_membership'),
    path('cancel_membership', views.CancelMembership.as_view(), name='cancel_membership'),
    path('course_builder', views.CourseBuilder.as_view(), name='course_builder_page'),
    path('course/<int:course_id>', views.CourseDetails.as_view(), name='course_details_page'),
    path('course/author/<int:course_id>', views.CourseAuthor.as_view(), name='course_author_page'),
    path('course/enrollment', views.EnrollCourse.as_view(), name='course_enrollment'),
    path('course/find', views.CourseSearchPage.as_view(), name='course_search_page'),
    path('course/chapter', views.CreateCourseChapter.as_view(), name='create_chapter'),
    path('course/content/<int:course_id>', views.CourseContentView.as_view(), name='course_content')
]

urlpatterns += staticfiles_urlpatterns()
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
