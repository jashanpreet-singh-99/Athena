from django.shortcuts import render, redirect
from django.urls import reverse
from django import views
from django.contrib.auth import get_user_model, authenticate, login, logout
from .forms import *
from .models import *
from django.http import JsonResponse

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
class Students(views.View):

    def get(self, request):
        context = {'title': 'Student Mng'}
        load_profile(context, request)
        return render(request, 'Athena/students_page.html', context)


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

        enrolled_courses = Enrollment.objects.filter(user=request.user)
        context['e_courses'] = enrolled_courses

        view_courses = Course.objects.order_by('-course_rating')[:9]
        context['v_courses'] = view_courses

        return render(request, 'Athena/course_page.html', context)


class Schedule(views.View):

    def get(self, request):
        context = {'title': 'Schedule'}
        load_profile(context, request)
        return render(request, 'Athena/schedule_page.html', context)


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

        context = {'title': 'Settings', 'form': form}
        # load profile image if present
        load_profile(context, request)

        # User info Form
        u_form = UserInfoSettingsForm(initial=initial_data_u)

        context['u_form'] = u_form

        # Membership Form
        m_form = UserMembershipForm(initial=initial_data_m)

        m_form.fields['membership'].widget.attrs['id'] = 'membership'

        context['m_form'] = m_form

        # Pass list of all Memberships available
        memberships_list = Membership.objects.all()
        context['membership_list'] = memberships_list

        # Pass Membership Features
        feature_list = MemberFeatures.objects.all()
        context['features_list'] = feature_list

        mm_form = UserMembershipForm(initial=initial_data_m)

        mm_form.fields['membership'].widget.attrs['id'] = 'membership-buy-selection'

        context['mm_form'] = mm_form

        return render(request, 'Athena/settings_page.html', context)


class CourseBuilder(views.View):

    def get(self, request):
        context = {'title': 'Course Builder'}

        form = CourseCreationForm()
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
                return redirect('course_page')
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
            return redirect('course_page')
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

        if course.author == request.user:
            return redirect(reverse('course_author_page', args=[course_id]))

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


class CourseSearchPage(views.View):

    def get(self, request):
        context = {'title': 'Find Course'}
        load_profile(context, request)
        return render(request, 'Athena/course_search_page.html', context)

    def post(self, request):
        context = {'title': 'Find Course'}
        load_profile(context, request)
        return render(request, 'Athena/course_search_page.html', context)


class CourseAuthor(views.View):

    def get(self, request, course_id):
        context = {'title': 'Course Details'}
        load_profile(context, request)
        course = Course.objects.get(id=course_id)
        author_profile = UserProfiles.objects.get(user=course.author)
        context['course'] = course
        context['author_profile'] = author_profile.img

        enrollment_info = Enrollment.objects.filter(course=course)
        context['e_info'] = enrollment_info

        #
        # Chapter Info
        #
        c_data = {'course': course}
        chapter_form = CourseChapterForm(initial=c_data)
        context['c_form'] = chapter_form

        chapters = CourseChapter.objects.filter(course=course)
        context['chapters'] = chapters

        #
        # Quiz Info
        #
        q_data = {'course': course}
        quiz_form = CourseQuizForm(initial=q_data)
        context['q_form'] = quiz_form
        quizzes = Quiz.objects.filter(course=course)
        context['quizzes'] = quizzes

        #
        # Assignment Info
        #
        a_data = {'course': course}
        ass_form = CourseAssignmentForm(initial=a_data)
        context['a_form'] = ass_form
        assignments = CourseAssignment.objects.filter(course=course)
        context['assignments'] = assignments

        #
        # Exam Info
        #
        e_data = {'course': course}
        exam_form = CourseInPersonExamForm(initial=e_data)
        context['e_form'] = exam_form
        exams = CourseInPersonExam.objects.filter(course=course)
        context['exams'] = exams

        page_scroll = request.session.get('page_scroll', 0)
        context['page_scroll'] = page_scroll
        print('Page Scroll:', page_scroll)
        return render(request, 'Athena/course_author_page.html', context)


class CreateCourseChapter(views.View):

    def post(self, request):
        print(request.POST)
        chapter_form = CourseChapterForm(request.POST, request.FILES)
        if chapter_form.is_valid():
            print('All done')
            chapter_form.save()
            return redirect(reverse('course_author_page', args=[chapter_form.cleaned_data['course'].id]))
        else:
            print('Form not valid')
            return redirect(reverse('course_author_page', args=[request.POST['course'].id]))


class CourseContentView(views.View):

    def get(self, request, course_id):
        context = {'title': 'Course Content'}
        load_profile(context, request)

        course = Course.objects.get(id=course_id)
        context['course'] = course

        chapters = CourseChapter.objects.filter(course__id=course_id, visibility=True)
        context['chapters'] = chapters

        quizzes = Quiz.objects.filter(course_id=course_id, visibility=True)
        context['quizzes'] = quizzes

        assignments = CourseAssignment.objects.filter(course_id=course_id, visibility=True)
        context['assignments'] = assignments

        r_data = {'course': course}
        rating_form = RatingForm(initial=r_data)

        rating_form.fields['course'].widget.attrs['style'] = 'display: none;'

        rating_form.fields['rating'].widget.attrs['id'] = 'rating_input'
        rating_form.fields['rating'].widget.attrs['style'] = 'display: none;'

        context['rating_form'] = rating_form

        return render(request, 'Athena/course_content_page.html', context)


'''
Quiz file Pattern
Q: 
O1:
O2:
O3:
O4:
A:
XXX
'''


class CreateQuiz(views.View):

    def post(self, request):
        quiz_form = CourseQuizForm(request.POST, request.FILES)
        if quiz_form.is_valid():
            quiz_info = quiz_form.cleaned_data['files'].file.read().decode('utf-8')
            print(len(quiz_info))
            quiz = quiz_form.save()

            for line in quiz_info.split('XXX\n'):
                if line == '':
                    continue
                if line.startswith('\n'):
                    line = line[1:]
                temp = line.split('\nO1:')
                question = temp[0][2:].strip()
                temp = temp[-1].split('\nO2:')
                option_1 = temp[0].strip()
                temp = temp[-1].split('\nO3:')
                option_2 = temp[0].strip()
                temp = temp[-1].split('\nO4:')
                option_3 = temp[0].strip()
                temp = temp[-1].split('\nA:')
                option_4 = temp[0].strip()
                t_answer = temp[-1].strip()
                index_o = t_answer.find('O')
                answer = int(t_answer[index_o+1:index_o+2])
                print(question, option_1, option_2, option_3, option_4, answer, sep='\n')
                QuizContent.objects.create(
                    course=quiz_form.cleaned_data['course'],
                    quiz=quiz,
                    question=question,
                    options_1=option_1,
                    options_2=option_2,
                    options_3=option_3,
                    options_4=option_4,
                    answers=answer
                )
            return redirect(reverse('course_author_page', args=[quiz_form.data['course']]))
        else:
            print('Form not valid:', quiz_form.errors)
            return redirect(reverse('course_author_page', args=[quiz_form.data['course']]))


class GetQuizQuestion(views.View):

    def get(self, request):
        print(request.GET)
        q_no = int(request.GET['question_no'])
        prev_selection = int(request.GET['prev_selection'])
        submit = int(request.GET['submit_quiz'])
        quiz = Quiz.objects.get(pk=request.GET['quiz_id'])
        all_questions = QuizContent.objects.filter(quiz__id=quiz.id)
        total_q = len(all_questions)
        # Remove previous quiz record
        if q_no == 0:
            StudentQuizSubmission.objects.filter(quiz__id=quiz.id, user__id=request.user.id).delete()

        # update previous_question submission
        if q_no > 0 and prev_selection > 0:
            print('Submit Last answer')
            p_questions = all_questions[q_no-1]
            try:

                check = StudentQuizSubmission.objects.get(quiz__id=quiz.id, user__id=request.user.id, question=p_questions)
                check.submission = prev_selection
            except StudentQuizSubmission.DoesNotExist:
                StudentQuizSubmission.objects.create(
                    user=request.user,
                    quiz=quiz,
                    question=p_questions,
                    submission=prev_selection
                )
            finally:
                pass
                # print(q_no, p_questions.question)

        quiz_questions = QuizContent.objects.filter(quiz__id=quiz.id)
        if len(quiz_questions) > q_no and submit < 1:
            print('Fetching next question.')
            quiz_question = quiz_questions[q_no]
            quiz_content_data = {
                'question': quiz_question.question,
                'options_1': quiz_question.options_1,
                'options_2': quiz_question.options_2,
                'options_3': quiz_question.options_3,
                'options_4': quiz_question.options_4,
            }
            context = {'question': quiz_content_data, 'blank': False, 'questions_count': total_q}
            return JsonResponse(context)
        else:
            print('Quiz Submitted, Calculating Scores')
            context = {'blank': True, 'questions_count': total_q}
            # calculate score
            answered_q = StudentQuizSubmission.objects.filter(quiz__id=quiz.id, user__id=request.user.id)
            total = QuizContent.objects.filter(quiz_id=quiz.id).count()
            score = 0
            for ans in answered_q:
                if ans.question.answers == ans.submission:
                    score += ans.quiz.each_mark
                else:
                    if ans.quiz.negative_marking:
                        n_grade = ans.quiz.negative_grade
                        score -= n_grade
            context['total'] = total
            context['answered'] = len(answered_q)
            context['score'] = round(score, 2)
            context['total_score'] = round(total * quiz.each_mark, 2)
            print(context)
            return JsonResponse(context)


class ChangeCourseChapterVisibility(views.View):

    def post(self, request):
        print(request.POST)
        if request.POST['mode'] == 'Chapter':
            chapter = CourseChapter.objects.get(id=request.POST['id'])
            vis = True if request.POST['visibility'] == 'True' else False
            print(chapter, vis)
            chapter.visibility = vis
            chapter.save()
        elif request.POST['mode'] == 'Quiz':
            quiz = Quiz.objects.get(id=request.POST['id'])
            vis = True if request.POST['visibility'] == 'True' else False
            print(quiz, vis)
            quiz.visibility = vis
            quiz.save()
        elif request.POST['mode'] == 'Assignment':
            ass = CourseAssignment.objects.get(id=request.POST['id'])
            vis = True if request.POST['visibility'] == 'True' else False
            print(ass, vis)
            ass.visibility = vis
            ass.save()
        request.session['page_scroll'] = int(request.POST['page_scroll'])
        return redirect(reverse('course_author_page', args=[request.POST['course']]))


class RemoveCourseContent(views.View):

    def post(self, request):
        print(request.POST)
        if request.POST['mode'] == 'Chapter':
            chapter = CourseChapter.objects.get(id=request.POST['id'])
            print(chapter)
            chapter.delete()
        elif request.POST['mode'] == 'Quiz':
            quiz = Quiz.objects.get(id=request.POST['id'])
            print(quiz)
            quiz.delete()
        elif request.POST['mode'] == 'Assignment':
            ass = CourseAssignment.objects.get(id=request.POST['id'])
            print(ass)
            ass.delete()
        elif request.POST['mode'] == 'Exam':
            exam = CourseInPersonExam.objects.get(id=request.POST['id'])
            print(exam)
            exam.delete()
        request.session['page_scroll'] = int(request.POST['page_scroll'])
        return redirect(reverse('course_author_page', args=[request.POST['course']]))


class CreateCourseAssignment(views.View):

    def post(self, request):
        print(request.POST)
        a_form = CourseAssignmentForm(request.POST, request.FILES)
        if a_form.is_valid():
            a_form.save()
            return redirect(reverse('course_author_page', args=[request.POST['course']]))
        else:
            print('Invalid Assignment Form')
            return redirect(reverse('course_author_page', args=[request.POST['course']]))


class CreateInPersonExam(views.View):

    def post(self, request):
        print(request.POST)
        e_form = CourseInPersonExamForm(request.POST)
        if e_form.is_valid():
            e_form.save()
            return redirect(reverse('course_author_page', args=[request.POST['course']]))
        else:
            print('Invalid Assignment Form')
            return redirect(reverse('course_author_page', args=[request.POST['course']]))


class UpdateCourseRating(views.View):

    def post(self, request):
        course = Course.objects.get(id=request.POST['course'])
        add_rating = request.POST['rating']
        enrollment_info = Enrollment.objects.filter(course=course)
        if len(enrollment_info) > 0:
            avg = ((len(enrollment_info) - 1) * course.course_rating + int(add_rating))/len(enrollment_info)
            if avg > 5:
                avg = 5
            course.course_rating = avg
            course.save()

        return redirect(reverse('course_content', args=[request.POST['course']]))


class AddQuizQuestion(views.View):
    def get(self, request, quiz_id):
        print(request.GET)
        context = {'title': 'Add Question'}
        quiz_questions = QuizContent.objects.filter(quiz__id = quiz_id)
        context['quiz_questions'] = quiz_questions

        quiz = Quiz.objects.get(id = quiz_id)
        if 'q_no' in request.GET.keys():
            q_data = QuizContent.objects.get(id=request.GET['q_no'])
            quiz_content_form = QuizContentForm(instance=q_data)
        else:
            q_data = {'course': quiz.course, 'quiz': quiz}
            quiz_content_form = QuizContentForm(initial=q_data)

        context['quiz_content_form'] = quiz_content_form

        return render(request, 'Athena/add_quiz_question.html', context)

    def post(self, request, quiz_id):
        print(request.POST)
        context = {'title': 'Add Question'}
        quiz_questions = QuizContent.objects.filter(quiz__id=quiz_id)
        context['quiz_questions'] = quiz_questions

        quiz = Quiz.objects.get(id=quiz_id)
        q_data = {'course': quiz.course, 'quiz': quiz}

        quiz_content_form = QuizContentForm(request.POST)

        if quiz_content_form.is_valid():
            if quiz_content_form.cleaned_data['type']:
                quiz_content_form.save()
            else:
                quiz_question = QuizContent.objects.get(id=quiz_content_form.cleaned_data['id'])
                quiz_content_form = QuizContentForm(request.POST, instance=quiz_question)
                quiz_content_form.save()

            quiz_content_form = QuizContentForm(initial=q_data)

            context['quiz_content_form'] = quiz_content_form

        else:
            context['msg'] = 'Error: '+str(quiz_content_form.errors)
            context['quiz_content_form'] = quiz_content_form

        return render(request, 'Athena/add_quiz_question.html', context)
