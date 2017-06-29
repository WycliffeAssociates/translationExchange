from django.http import HttpResponse, StreamingHttpResponse
from django.shortcuts import render
from django.core.files.storage import FileSystemStorage
import json
from django.core import serializers
import zipfile
#from os import remove
from rest_framework import viewsets, views
from rest_framework.response import Response
from rest_framework.parsers import JSONParser, FileUploadParser
from parsers import MP3StreamParser
from .serializers import LanguageSerializer, BookSerializer, UserSerializer
from .serializers import TakeSerializer, CommentSerializer
from .models import Language, Book, User, Take, Comment
import pydub
import time
import uuid
import os
from tinytag import TinyTag

class LanguageViewSet(viewsets.ModelViewSet):
    """This class handles the http GET, PUT and DELETE requests."""
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer

class BookViewSet(viewsets.ModelViewSet):
    """This class handles the http GET, PUT and DELETE requests."""
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class UserViewSet(viewsets.ModelViewSet):
    """This class handles the http GET, PUT and DELETE requests."""
    queryset = User.objects.all()
    serializer_class = UserSerializer

class TakeViewSet(viewsets.ModelViewSet):
    """This class handles the http GET, PUT and DELETE requests."""
    queryset = Take.objects.all()
    serializer_class = TakeSerializer

class CommentViewSet(viewsets.ModelViewSet):
    """This class handles the http GET, PUT and DELETE requests."""
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class ProjectViewSet(views.APIView):
    parser_classes = (JSONParser,)

    def post(self, request):
        data = json.loads(request.body)

        lst = []
        takes = Take.objects \
            .filter(language__code=data["language"]) \
            .filter(book__code=data["slug"]) \
            .filter(chapter=data["chapter"]) \
            .values()

        """for take in takes:
            take["language"] = Language.objects.get(pk=take["language_id"])
            take["book"] = Book.objects.get(pk=take["book_id"])
"""
        """metas = Meta.objects.filter(language=data["language"])
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
            lst.append(dic)"""

        return Response(takes, status=200)

class FileUploadView(views.APIView):
    parser_classes = (FileUploadParser,)
    def post(self, request, filename, format='zip'):
        if request.method == 'POST' and request.data['file']:
            uuid_name = str(time.time()) + str(uuid.uuid4())
            upload = request.data["file"]
            #unzip files
            zip = zipfile.ZipFile(upload)
            file_name = 'media/dump/' + uuid_name
            zip.extractall(file_name)
            zip.close()
            #extract metadata / get the apsolute path to the file to be stored
            for root, dirs, files in os.walk(file_name):
                for f in files:
                    abpath = os.path.join(root, os.path.basename(f))
                    meta = TinyTag.get(abpath)
                    print(meta.artist)

                    #store the metadata inside the database


            return Response({"response": "ok"}, status=200)
        else:
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
