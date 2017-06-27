from django.http import HttpResponse
from django.shortcuts import render
from django.core.files.storage import FileSystemStorage
import json
import zipfile
from os import remove
from rest_framework import viewsets
from .serializers import ProjectSerializer, UserSerializer, FileSerializer
from .serializers import CommentSerializer, MetaSerializer
from .models import Project, User, File, Comment, Meta

class ProjectViewSet(viewsets.ModelViewSet):
    """This class handles the http GET, PUT and DELETE requests."""
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class UserViewSet(viewsets.ModelViewSet):
    """This class handles the http GET, PUT and DELETE requests."""
    queryset = User.objects.all()
    serializer_class = UserSerializer

class FileViewSet(viewsets.ModelViewSet):
    """This class handles the http GET, PUT and DELETE requests."""
    queryset = File.objects.all()
    serializer_class = FileSerializer

class MetaViewSet(viewsets.ModelViewSet):
    """This class handles the http GET, PUT and DELETE requests."""
    queryset = Meta.objects.all()
    serializer_class = MetaSerializer

class CommentViewSet(viewsets.ModelViewSet):
    """This class handles the http GET, PUT and DELETE requests."""
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer


def index(request):
    return render(request, 'index.html')

def upload(request):
    if request.method == 'POST' and request.FILES['upload']:
        upload = request.FILES['upload']
        fs = FileSystemStorage()
        filename = fs.save(upload.name, upload)
        uploaded_file_url = fs.url(filename)

        zip = zipfile.ZipFile(upload)
        zip.extractall("media/unzipped")
        remove(uploaded_file_url)
        zip.close()

        #return render(request, 'index.html', {"uploaded_file_url": uploaded_file_url})
        return HttpResponse(json.dumps({"response": "ok"}), content_type='application/json')
