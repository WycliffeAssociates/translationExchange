from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^get_counter$', views.getCounter, name='get_counter'),
    url(r'^upload$', views.upload, name='upload'),
]

