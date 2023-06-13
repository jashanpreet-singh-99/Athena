from django.shortcuts import render
from django.views import View


# Create your views here.
class Dash(View):

    def get(self, request):
        context = {'text': 'name'}
        return render(request, 'dash.html', context)
