from django.http import HttpResponse
from django.shortcuts import render
from django.core.files.storage import FileSystemStorage
import json
import zipfile
from os import remove

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
