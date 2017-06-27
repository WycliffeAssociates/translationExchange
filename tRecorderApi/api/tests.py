from django.test import TestCase
from .models import File, Project, User, Meta, Comment
from datetime import datetime
from rest_framework.test import APIClient
from rest_framework import status
from django.core.urlresolvers import reverse

#Creating a text file to log the results of each of the tests
with open("test_log.txt", "w") as test_log:
    test_log.write("API TEST LOG\n")  #create title for test log
    sttime = datetime.now().strftime('%m/%d/%Y_%H:%M:%S') #create time stamp for test log
    test_log.write("DATE:" + sttime + "\n\n")  #print time stamp to test log

class ModelTestCase(TestCase):
    """This class defines the test suite for the each of the models."""


    def setUp(self):
        """Define the test client and other test variables."""
        self.file_location = "uploads/file.zip"
        self.file = File(location=self.file_location)
        self.project = Project(lang='english', code='abc')
        self.user = User(name='tester', agreed=True, picture='test.pic')
        self.meta = Meta(anthology='ub', language='english', version='ESV', slug='mrk', chapter=0)
        self.comment = Comment(location='test_location')

    def test_model_can_create_a_File(self):
        """Test the File model can create a file."""
        old_count = File.objects.count()  #obtain current count of object in database
        self.file.save()   #save object to database
        new_count = File.objects.count()  #obtain new count of object in database
        test_log = open("test_log.txt", "a")  #append test results to test log
        if self.assertNotEqual(old_count, new_count):
            test_log.write("TEST: Creating and Storing a File Object........................FAILED\n")
        else:
            test_log.write("TEST: Creating and Storing a File Object........................PASSED\n")
        test_log.close()


    def test_model_can_create_a_Project(self):
        """Test the Project model can create a file."""
        old_count = Project.objects.count()
        self.project.save()
        new_count = Project.objects.count()
        test_log = open("test_log.txt", "a")
        if self.assertNotEqual(old_count, new_count):
            test_log.write("TEST: Creating and Storing a Project Object.....................FAILED\n")
        else:
            test_log.write("TEST: Creating and Storing a Project Object.....................PASSED\n")
        test_log.close()

    def test_model_can_create_a_User(self):
        """Test the User model can create a file."""
        old_count = User.objects.count()
        self.user.save()
        new_count = User.objects.count()
        test_log = open("test_log.txt", "a")
        if self.assertNotEqual(old_count, new_count):
            test_log.write("TEST: Creating and Storing a User Object........................FAILED\n")
        else:
            test_log.write("TEST: Creating and Storing a User Object........................PASSED\n")
        test_log.close()

    def test_model_can_create_a_Meta(self):
        """Test the Meta model can create a file."""
        old_count = Meta.objects.count()
        self.meta.save()
        new_count = Meta.objects.count()
        test_log = open("test_log.txt", "a")
        if self.assertNotEqual(old_count, new_count):
            test_log.write("TEST: Creating and Storing a Meta Object........................FAILED\n")
        else:
            test_log.write("TEST: Creating and Storing a Meta Object........................PASSED\n")
        test_log.close()

    def test_model_can_create_a_Comment(self):
        """Test the Comment model can create a file."""
        old_count = Comment.objects.count()
        self.comment.save()
        new_count = Comment.objects.count()
        test_log = open("test_log.txt", "a")
        if self.assertNotEqual(old_count, new_count):
            test_log.write("TEST: Creating and Storing a Comment Object.....................FAILED\n")
        else:
            test_log.write("TEST: Creating and Storing a Comment Object.....................PASSED\n")
        test_log.close()

class ViewTestCases(TestCase):
    def setUp(self):
        """Set up environment for api view test suite"""
        self.client = APIClient()
        self.file_data = {'location' : 'test_location'}
        self.project_data = {'lang' : 'english', 'code' : 'abc'}
        self.user_data = {'name' : 'tester', 'agreed' : True, 'picture' : 'test.pic'}
        self.meta_data = {'anthology':'ub', 'language':'english', 'version':'ESV', 'slug':'mrk', 'chapter':0}
        self.comment = {'location':'test_location'}

    def test_api_can_create_file_object(self):
        """Test the API has file creation capability"""
        self.response = self.client.post()

