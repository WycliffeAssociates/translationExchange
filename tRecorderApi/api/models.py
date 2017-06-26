from mongoengine import *
from django.db import models

class Meta(EmbeddedDocument):
    #meta_id = ObjectIdField(default=ObjectId)
    anthology = StringField(min_length=1)
    language = StringField(min_length=1)
    version = StringField(min_length=1)
    slug = StringField(min_length=1)
    book_number = IntField(min_value=1)
    mode = StringField(min_length=1)
    chapter = IntField(min_value=1)
    startv = IntField(min_value=1)
    endv = IntField(min_value=1)
    markers = DictField()

    def __str__(self):
        return '{}-{}-{}'.format(self.language, self.anthology, self.slug)

class Comment(EmbeddedDocument):
    #comment_id = ObjectIdField(default=ObjectId)
    location = StringField(min_length=1)
    user = ReferenceField('User')

    def __str__(self):
        return self.location

class File(Document):
    location = StringField(min_length=1)
    duration = IntField(min_value=0)
    rating = IntField(min_value=0)
    checked_level = IntField(min_value=0)
    project_id = StringField(max_length=24)
    meta_data = EmbeddedDocumentField(Meta)
    comments = ListField(EmbeddedDocumentField(Comment))

    def __str__(self):
        return self.location

class Project(Document):
    lang = StringField(min_length=1)
    code = StringField(min_length=1)

    def __str__(self):
        return self.lang

class User(Document):
    name = StringField(min_length=1)
    agreed = BooleanField()
    picture = StringField(min_length=1)

    def __str__(self):
        return self.name
