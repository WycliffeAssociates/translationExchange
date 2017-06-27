# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models import File, Meta, Comment, User, Language

# Register your models here.
admin.site.register(File)
admin.site.register(Meta)
admin.site.register(Comment)
admin.site.register(User)
admin.site.register(Language)