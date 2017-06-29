from django.conf.urls import url, include
from . import views
from rest_framework import routers
from api import views

router = routers.DefaultRouter()
router.register(r'languages', views.LanguageViewSet)
router.register(r'users', views.UserViewSet)
router.register(r'files', views.TakeViewSet)
router.register(r'metas', views.MetaViewSet)
router.register(r'comments', views.CommentViewSet)

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^upload/(?P<filename>[^/]+)$', views.FileUploadView.as_view()),
    url(r'^stream/(?P<filepath>.*)$', views.FileStreamView.as_view()),
    url(r'^get_project/$', views.ProjectViewSet.as_view())
]

urlpatterns += router.urls
#urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
