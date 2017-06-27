from django.conf.urls import url, include
from . import views
from rest_framework import routers
from api.views import ProjectViewSet, UserViewSet, FileViewSet
from api.views import MetaViewSet, CommentViewSet, FileUploadView

router = routers.DefaultRouter()
router.register(r'projects', ProjectViewSet)
router.register(r'users', UserViewSet)
router.register(r'files', FileViewSet)
router.register(r'metas', MetaViewSet)
router.register(r'comments', CommentViewSet)

urlpatterns = [
    url(r'^$', views.index, name='index'),
    #url(r'^upload$', views.upload, name='upload'),
    url(r'^upload/(?P<filename>[^/]+)$', FileUploadView.as_view())
]

urlpatterns += router.urls
#urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
