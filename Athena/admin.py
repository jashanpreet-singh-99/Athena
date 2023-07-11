from django.contrib import admin
from .models import *

admin.site.register(User)
admin.site.register(UserProfiles)
admin.site.register(Membership)
admin.site.register(MemberFeatures)
admin.site.register(CourseCategories)
admin.site.register(Course)
admin.site.register(Enrollment)
admin.site.register(CourseChapter)
admin.site.register(File)
