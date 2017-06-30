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
import urllib2
import pickle

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
        takes = Take.objects.all()
        if "language" in data: takes.filter(language__code=data["language"])
        if "slug" in data: takes.filter(book__code=data["slug"])
        if "chapter" in data: takes.filter(chapter=data["chapter"])
        takes = takes.values()

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
            uuid_name = str(time.time()) + str(uuid.uuid4())
            upload = request.data["file"]
            #unzip files
            zip = zipfile.ZipFile(upload)
            file_name = 'media/dump/' + uuid_name
            zip.extractall(file_name)
            zip.close()
            #extract metadata / get the apsolute path to the file to be stored

            # Cache language and book to re-use later
            bookname = ''
            bookcode = ''
            langname = ''
            langcode = ''

            for root, dirs, files in os.walk(file_name):
                for f in files:
                    abpath = os.path.join(root, os.path.basename(f))
                    meta = TinyTag.get(abpath)
                    a = meta.artist
                    lastindex = a.rfind("}") + 1
                    substr = a[:lastindex]
                    pls = json.loads(substr)

                    if bookcode != pls['slug']:
                        bookcode = pls['slug']
                        bookname = getBookByCode(bookcode)
                    if langcode != pls['language']:
                        langcode = pls['language']
                        langname = getLanguageByCode(langcode)

                    data = {
                        "langname": langname,
                        "bookname": bookname,
                        "duration": meta.duration
                        }
                    prepareDataToSave(pls, abpath, data)
            return Response({"response": "ok"}, status=200)
        else:
            return Response(status=404)

class FileStreamView(views.APIView):
    parser_classes = (MP3StreamParser,)

    def get(self, request, filepath, format='mp3'):
        sound = pydub.AudioSegment.from_wav(filepath)
        file = sound.export()

        return StreamingHttpResponse(file)

def index(request):
    return render(request, 'index.html')

def prepareDataToSave(meta, abpath, data):
    book, b_created = Book.objects.get_or_create(
        code = meta["slug"],
        defaults={'code': meta['slug'], 'booknum': meta['book_number'], 'name': data['bookname']},
    )
    language, l_created = Language.objects.get_or_create(
        code = meta["language"],
        defaults={'code': meta['language'], 'name': data['langname']},
    )
    markers = convertstring(meta['markers'])
    # TODO get author of file and save it to Take model
    take = Take(location=abpath,
                duration = data['duration'],
                book = book,
                language = language,
                rating = 0, checked_level = 0,
                anthology = meta['anthology'],
                version = meta['version'],
                mode = meta['mode'],
                chapter = meta['chapter'],
                startv = meta['startv'],
                endv = meta['endv'],
                markers = markers)
    take.save()

def convertstring(dictionary):
    if not isinstance(dictionary, dict):
        return dictionary
    return dict((str(k), convertstring(v))
        for k, v in dictionary.items())

def getLanguageByCode(code):
    url = 'http://td.unfoldingword.org/exports/langnames.json'
    languages = []
    try:
        response = urllib2.urlopen(url)
        languages = json.loads(response.read())
        with open('language.json', 'wb') as fp:
            pickle.dump(languages, fp)
    except urllib2.URLError, e:
        with open ('language.json', 'rb') as fp:
            languages = pickle.load(fp)
        
    ln = ""
    for dicti in languages:
        if dicti["lc"] == code:
            ln = dicti["ln"]
            break
    return ln

def getBookByCode(code):
    with open('books.json') as books_file:    
        books = json.load(books_file) 

    bn = ""
    for dicti in books:
        if dicti["slug"] == code:
            bn = dicti["name"]
            break
    return bn