from django.db import models

class User(models.Model):
    name = models.CharField(max_length=50)
    agreed = models.BooleanField()
    picture = models.CharField(max_length=250)

    def __str__(self):
        return self.name

class Meta(models.Model):
    #meta_id = ObjectIdField(default=ObjectId)
    anthology = models.CharField(max_length=2)
    language = models.CharField(max_length=20)
    version = models.CharField(max_length=3)
    slug = models.CharField(max_length=3)
    book_number = models.IntegerField(default=0)
    mode = models.CharField(max_length=10)
    chapter = models.IntegerField(default=0)
    startv = models.IntegerField(default=0)
    endv = models.IntegerField(default=0)
    #markers = DictField() ???

    def __str__(self):
        return '{}-{}-{}'.format(self.language, self.anthology, self.slug)

class Comment(models.Model):
    #comment_id = ObjectIdField(default=ObjectId)
    location = models.CharField(max_length=250)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.location

class File(models.Model):
    location = models.CharField(max_length=250)
    duration = models.IntegerField(default=0)
    rating = models.IntegerField(default=0)
    checked_level = models.IntegerField(default=0)
    project_id = models.CharField(max_length=24)
    #meta_data = EmbeddedDocumentField(Meta)
    #comments = ListField(EmbeddedDocumentField(Comment))

    def __str__(self):
        return self.location

class Project(models.Model):
    lang = models.CharField(max_length=50)
    code = models.CharField(max_length=20)

    def __str__(self):
        return self.lang
