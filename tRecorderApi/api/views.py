from django.http import HttpResponse
import json
from api.models import Uploads


def index(request):
    return HttpResponse("Hello World!")

def getCounter(request):
    data = json.dumps({"counter": "1"})
    return HttpResponse(data, content_type='application/json')

def upload(request):
    # request.data.files
    # process zip file
    # write to db
    
    return HttpResponse("ok")
