from django.urls import path
from Athena import views
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('', views.Courses.as_view(), name='home_page'),
    path('students', views.Students.as_view(), name='students_page'),
    path('course', views.Courses.as_view(), name='course_page'),
    path('schedule', views.Schedule.as_view(), name='schedule_page'),
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
    path('course/content/<int:course_id>', views.CourseContentView.as_view(), name='course_content'),
    path('course/content/quiz', views.CreateQuiz.as_view(), name='create_quiz'),
    path('course/content/quiz/questions', views.GetQuizQuestion.as_view(), name='get_quiz_questions'),
    path('course/content/chapter/vis', views.ChangeCourseChapterVisibility.as_view(), name='change_chapter_visibility'),
    path('course/content/assignement', views.CreateCourseAssignment.as_view(), name='create_course_assignment'),
    path('course/content/exam', views.CreateInPersonExam.as_view(), name='create_course_exam'),
    path('course/content/remove', views.RemoveCourseContent.as_view(), name='delete_course_content'),
    path('course/content/rating', views.UpdateCourseRating.as_view(), name='update_course_rating'),
    path('course/add_question/<int:quiz_id>',views.AddQuizQuestion.as_view(), name='add_quiz_question')
]

urlpatterns += staticfiles_urlpatterns()
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
