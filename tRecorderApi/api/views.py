from django.http import HttpResponse, StreamingHttpResponse
from django.shortcuts import render
from django.core.files.storage import FileSystemStorage
import json
from django.core import serializers
import zipfile
from os import remove
from rest_framework import viewsets, views
from rest_framework.response import Response
from rest_framework.parsers import JSONParser, FileUploadParser
from parsers import MP3StreamParser
from .serializers import LanguageSerializer, UserSerializer, TakeSerializer
from .serializers import CommentSerializer, MetaSerializer
from .models import Language, User, Take, Comment, Meta
import pydub

class LanguageViewSet(viewsets.ModelViewSet):
    """This class handles the http GET, PUT and DELETE requests."""
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer

class UserViewSet(viewsets.ModelViewSet):
    """This class handles the http GET, PUT and DELETE requests."""
    queryset = User.objects.all()
    serializer_class = UserSerializer

class TakeViewSet(viewsets.ModelViewSet):
    """This class handles the http GET, PUT and DELETE requests."""
    queryset = Take.objects.all()
    serializer_class = TakeSerializer

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
        data = json.loads(request.body)

        metas = Meta.objects.filter(language=data["language"])
        metas.filter(slug=data["slug"])
        metas.filter(chapter=data["chapter"])

        lst = []
        for item in metas.values():
            dic = {}
            dic["take"] = Take.objects.filter(meta=item["take_id"]).values()[0]
            if item["markers"]:
                item["markers"] = json.loads(item["markers"])
            else:
                item["markers"] = {}
            dic["meta"] = item
            lst.append(dic)

        return Response(lst, status=200)

class FileUploadView(views.APIView):
    parser_classes = (FileUploadParser,)

    def post(self, request, filename, format='zip'):
        if request.method == 'POST' and request.data['file']:
            import uuid
            import time
            from tinytag import TinyTag

            uuid_name = str(time.time()) + str(uuid.uuid4())
            upload = request.data['file']
            
            # Unzip files
            zip = zipfile.ZipFile(upload)
            zip.extractall("media/dump/"+uuid_name)
            zip.close()

            # Walk through all extracted files
            # And read wave meta
            #file = TinyTag.get("path to file")

            # Move files to specified folders

            # Save meta to database

            return Response({"response":"ok"}, status=200)
        return Response(status=404)

class FileStreamView(views.APIView):
    parser_classes = (MP3StreamParser,)

    def get(self, request, filepath, format='mp3'):
        filepath = "media/saved/" + filepath + ".wav"
        sound = pydub.AudioSegment.from_wav(filepath)
        file = sound.export("audio.mp3", format="mp3")
        
        return StreamingHttpResponse(file)

def index(request):
    return render(request, 'index.html')
