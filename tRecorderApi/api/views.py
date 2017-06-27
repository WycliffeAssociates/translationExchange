from django.http import HttpResponse
from django.shortcuts import render
from django.core.files.storage import FileSystemStorage
import json
import zipfile
from os import remove
from rest_framework import viewsets, views
from rest_framework.response import Response
from rest_framework.parsers import JSONParser, FileUploadParser
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

class FileUploadView(views.APIView):
    parser_classes = (FileUploadParser,)

    def post(self, request, filename, format='zip'):
        if request.method == 'POST' and request.data['file']:
            upload = request.data['file']
            
            zip = zipfile.ZipFile(upload)
            zip.extractall("media/unzipped")
            zip.close()

            return Response({"response":"ok"}, status=200)
        return Response(status=404)


def index(request):
    return render(request, 'index.html')
