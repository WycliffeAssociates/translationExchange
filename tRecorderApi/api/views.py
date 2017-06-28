from django.http import HttpResponse, StreamingHttpResponse
from django.shortcuts import render
from django.core.files.storage import FileSystemStorage
import json
import zipfile
from os import remove
from rest_framework import viewsets, views
from rest_framework.response import Response
from rest_framework.parsers import JSONParser, FileUploadParser
from parsers import MP3StreamParser
from .serializers import LanguageSerializer, UserSerializer, FileSerializer
from .serializers import CommentSerializer, MetaSerializer
from .models import Language, User, File, Comment, Meta
import pydub

class LanguageViewSet(viewsets.ModelViewSet):
    """This class handles the http GET, PUT and DELETE requests."""
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer

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

class ProjectViewSet(views.APIView):
    parser_classes = (JSONParser,)

    def post(self, request):
        # just to test that it works
        me = json.loads(request.body)
                
        return Response(me, status=200)

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

class FileStreamView(views.APIView):
    parser_classes = (MP3StreamParser,)

    def get(self, request, filepath, format='mp3'):
        print filepath
        sound = pydub.AudioSegment.from_wav(filepath + ".wav")
        file = sound.export("audio.mp3", format="mp3")
        
        return StreamingHttpResponse(file)

def index(request):
    return render(request, 'index.html')
