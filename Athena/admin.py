from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import *
# Register your models here.


admin.site.register(User)
admin.site.register(UserProfiles)
admin.site.register(Membership)
admin.site.register(MemberFeatures)
