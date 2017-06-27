from django.test import TestCase
from .models import File, Project, User, Meta, Comment
from datetime import datetime

#Creating a text file to log the results of each of the tests
with open("test_log.txt", "w") as test_log:
    test_log.write("API TEST LOG\n")
    sttime = datetime.now().strftime('%m/%d/%Y_%H:%M:%S')
    test_log.write("DATE:" + sttime + "\n\n")

class ModelTestCase(TestCase):
    """This class defines the test suite for the each of the models."""


    def setUp(self):
        """Define the test client and other test variables."""
        self.file_location = "uploads/file.zip"
        self.file = File(location=self.file_location)
        self.project = Project(lang='english', code='abc')
        self.user = User(name='tester', agreed=True, picture='test.pic')
        self.meta = Meta(anthology='ub', language='english', version='ESV', slug='mrk', book_number=0, chapter=0, startv=0, endv=0)
        self.comment = Comment(location='test_location')

    def test_model_can_create_a_File(self):
        """Test the File model can create a file."""
        old_count = File.objects.count()
        self.file.save()
        new_count = File.objects.count()
        test_log = open("test_log.txt", "a")
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
