from mongoengine import *
from django.db import models

class Uploads(models.Model):
    str = StringField(max_length=5)

    def getStr(self):
        self.str = "Hello from upload"
        return self.str
