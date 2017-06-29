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
from .serializers import LanguageSerializer, BookSerializer, UserSerializer
from .serializers import TakeSerializer, CommentSerializer
from .models import Language, Book, User, Take, Comment 
import pydub

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

        for take in takes:
            dic = {}
            # Include language name
            dic["language"] = Language.objects.filter(pk=take["language_id"]).values()[0]
            # Include book name
            dic["book"] = Book.objects.filter(pk=take["book_id"]).values()[0]
            # Include author of file
            dic["user"] = User.objects.filter(pk=take["user_id"]).values()[0]
            
            # Include comments
            dic["comments"] = []
            for cmt in Comment.objects.filter(file=take["id"]).values():
                dic2 = {}
                dic2["comment"] = cmt
                # Include author of comment
                dic2["user"] = User.objects.filter(pk=cmt["user_id"]).values()[0]
                dic["comments"].append(dic2)
            
            # Parse markers
            if take["markers"]:
                take["markers"] = json.loads(take["markers"])
            else:
                take["markers"] = {}
            dic["take"] = take
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
