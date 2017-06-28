from django.test import TestCase
from .models import File, Language, User, Meta, Comment
from datetime import datetime
from rest_framework.test import APIClient
from rest_framework import status

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
        self.language = Language(lang='english', code='abc')
        self.user = User(name='tester', agreed=True, picture='test.pic')
        self.meta = Meta(anthology='ub', language='english', version='ESV', slug='mrk', chapter=0)
        self.comment = Comment(location='test_location')

    def test_model_can_create_a_File(self):
        """Test the File model can create a file."""
        old_count = File.objects.count()  #obtain current count of object in database
        self.file.save()   #save object to database
        new_count = File.objects.count()  #obtain new count of object in database
        self.assertNotEqual(old_count, new_count)
        test_log = open("test_log.txt", "a")  #append test results to test log
        test_log.write("TEST: Creating and Storing a File Object........................PASSED\n")
        test_log.close()

    def test_model_can_create_a_Project(self):
        """Test the Project model can create a file."""
        old_count = Language.objects.count()
        self.language.save()
        new_count = Language.objects.count()
        self.assertNotEqual(old_count, new_count)
        test_log = open("test_log.txt", "a")
        test_log.write("TEST: Creating and Storing a Project Object.....................PASSED\n")
        test_log.close()

    def test_model_can_create_a_User(self):
        """Test the User model can create a file."""
        old_count = User.objects.count()
        self.user.save()
        new_count = User.objects.count()
        self.assertNotEqual(old_count, new_count)
        test_log = open("test_log.txt", "a")
        test_log.write("TEST: Creating and Storing a User Object........................PASSED\n")
        test_log.close()

    def test_model_can_create_a_Meta(self):
        """Test the Meta model can create a file."""
        old_count = Meta.objects.count()
        self.meta.save()
        new_count = Meta.objects.count()
        self.assertNotEqual(old_count, new_count)
        test_log = open("test_log.txt", "a")
        test_log.write("TEST: Creating and Storing a Meta Object........................PASSED\n")
        test_log.close()

    def test_model_can_create_a_Comment(self):
        """Test the Comment model can create a file."""
        old_count = Comment.objects.count()
        self.comment.save()
        new_count = Comment.objects.count()
        self.assertNotEqual(old_count, new_count)
        test_log = open("test_log.txt", "a")
        test_log.write("TEST: Creating and Storing a Comment Object.....................PASSED\n")
        test_log.close()

    def test_each_model_can_be_read_in_a_human_readable_format(self):
        """Each Model has a __unicode__() which prints a readable name to the DB
        This test makes sure each model's unicode method outputs correctly"""
        self.assertEqual("uploads/file.zip", self.file.__unicode__())
        self.assertEqual("english", self.language.__unicode__())
        self.assertEqual("tester", self.user.__unicode__())
        self.assertEqual("english-ub-mrk", self.meta.__unicode__())
        self.assertEqual("test_location", self.comment.__unicode__())
        test_log = open("test_log.txt", "a")
        test_log.write("TEST: Printing Each Model's Unicode.............................PASSED\n")
        test_log.close()



class ViewTestCases(TestCase):
    def setUp(self):
        """Set up environment for api view test suite"""
        self.client = APIClient()
        self.file_data = {'location' : 'test_location'}
        self.lang_data = {'lang' : 'english', 'code' : 'abc'}
        #self.user_data = {'name' : 'tester', 'agreed' : True, 'picture' : 'test.pic'}
        self.meta_data = {'anthology':'ub', 'language':'english', 'version':'ESV', 'slug':'mrk', 'mode':'test'}
        self.comment = {'location':'test_location'}

    def test_api_can_create_file_object(self):
        """Test the API has file creation capability:
        Sending JSON File Object To API and
        Expecting HTTP Success Message Returned"""
        self.response = self.client.post('http://127.0.0.1:8000/api/files/', self.file_data, format='json') #send POST to API
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)
        test_log = open("test_log.txt", "a")
        test_log.write("TEST: Posting File Object to API................................PASSED\n")
        test_log.close()

    def test_api_can_create_lang_object(self):
        """Test the API has lang creation capability:
        Sending JSON File Object To API and
        Expecting HTTP Success Message Returned"""
        self.response = self.client.post('http://127.0.0.1:8000/api/languages/', self.lang_data,format='json')  # send POST to API
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)
        test_log = open("test_log.txt", "a")
        test_log.write("TEST: Posting Language Object to API............................PASSED\n")
        test_log.close()

    def test_api_can_create_meta_object(self):
        """Test the API has lang creation capability:
        Sending JSON File Object To API and
        Expecting HTTP Success Message Returned"""
        self.response = self.client.post('http://127.0.0.1:8000/api/metas/', self.meta_data,format='json')  # send POST to API
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)
        test_log = open("test_log.txt", "a")
        test_log.write("TEST: Posting Meta Object to API................................PASSED\n")
        test_log.close()

    def test_api_can_create_comment_object(self):
        """Test the API has lang creation capability:
        Sending JSON File Object To API and
        Expecting HTTP Success Message Returned"""
        self.response = self.client.post('http://127.0.0.1:8000/api/comments/', self.comment,format='json')  # send POST to API
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)
        test_log = open("test_log.txt", "a")
        test_log.write("TEST: Posting Comment Object to API.............................PASSED\n")
        test_log.close()


    #def test_api_can_update_####_object:
        ######
        #####

    #def test_api_can_delete_####_object:
        ######
        #####