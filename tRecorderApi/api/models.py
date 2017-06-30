from django.db import models

class Language(models.Model):
    code = models.CharField(max_length=20, unique=True, blank=True)
    name = models.CharField(max_length=100, blank=True)

    def __unicode__(self):
        return self.name

class Book(models.Model):
    code = models.CharField(max_length=3, unique=True, blank=True)
    name = models.CharField(max_length=100, blank=True)
    booknum = models.IntegerField(default=0)

    def __unicode__(self):
        return self.name

class User(models.Model):
    name = models.CharField(max_length=50)
    agreed = models.BooleanField()
    picture = models.CharField(max_length=250)

    def __unicode__(self):
        return self.name

class Take(models.Model):
    location = models.CharField(max_length=250)
    duration = models.IntegerField(default=0)
    rating = models.IntegerField(default=0)
    checked_level = models.IntegerField(default=0)
    language = models.ForeignKey(Language, on_delete=models.CASCADE, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    book = models.ForeignKey(Book, on_delete=models.CASCADE, null=True, blank=True)
    anthology = models.CharField(max_length=2, blank=True)
    version = models.CharField(max_length=3, blank=True)
    mode = models.CharField(max_length=10, blank=True)
    chapter = models.IntegerField(default=0)
    startv = models.IntegerField(default=0)
    endv = models.IntegerField(default=0)
    markers = models.TextField(null=True, blank=True)

    def __unicode__(self):
        return '{}-{}-{}({})'.format(self.language, self.anthology, self.book, self.id)

class Comment(models.Model):
    location = models.CharField(max_length=250)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    file = models.ForeignKey(Take, on_delete=models.CASCADE, null=True, blank=True)

    def __unicode__(self):
        return self.location
