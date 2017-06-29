from django.db import models

class Language(models.Model):
    lang = models.CharField(max_length=50)
    code = models.CharField(max_length=20)

    def __unicode__(self):
        return self.lang

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

    def __unicode__(self):
        return self.location

class Meta(models.Model):
    anthology = models.CharField(max_length=2)
    language = models.CharField(max_length=20)
    version = models.CharField(max_length=3)
    slug = models.CharField(max_length=3)
    book_number = models.IntegerField(default=0)
    mode = models.CharField(max_length=10)
    chapter = models.IntegerField(default=0)
    startv = models.IntegerField(default=0)
    endv = models.IntegerField(default=0)
    markers = models.TextField(null=True, blank=True)
    take = models.ForeignKey(Take, on_delete=models.CASCADE, null=True, blank=True)

    def __unicode__(self):
        return '{}-{}-{}'.format(self.language, self.anthology, self.slug)

class Comment(models.Model):
    location = models.CharField(max_length=250)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    file = models.ForeignKey(Take, on_delete=models.CASCADE, null=True, blank=True)

    def __unicode__(self):
        return self.location

