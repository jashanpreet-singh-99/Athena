from django.urls import path
from Athena import views

urlpatterns = [
    path('', views.Dash.as_view(), name='home_page')
]