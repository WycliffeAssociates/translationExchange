# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models import Take, Meta, Comment, User, Language

# Register your models here.
admin.site.register(Take)
admin.site.register(Meta)
admin.site.register(Comment)
admin.site.register(User)
admin.site.register(Language)