from django.urls import path
from Athena import views
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

urlpatterns = [
    path('', views.Dash.as_view(), name='home_page')
]

urlpatterns += staticfiles_urlpatterns()