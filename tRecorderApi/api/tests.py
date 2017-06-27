from django.test import TestCase
from .models import File, Project, User, Meta, Comment

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
        self.assertNotEqual(old_count, new_count)

    def test_model_can_create_a_Project(self):
        """Test the Project model can create a file."""
        old_count = Project.objects.count()
        self.project.save()
        new_count = Project.objects.count()
        self.assertNotEqual(old_count, new_count)

    def test_model_can_create_a_User(self):
        """Test the User model can create a file."""
        old_count = User.objects.count()
        self.user.save()
        new_count = User.objects.count()
        self.assertNotEqual(old_count, new_count)

    def test_model_can_create_a_Meta(self):
        """Test the Meta model can create a file."""
        old_count = Meta.objects.count()
        self.meta.save()
        new_count = Meta.objects.count()
        self.assertNotEqual(old_count, new_count)

    def test_model_can_create_a_Comment(self):
        """Test the Comment model can create a file."""
        old_count = Comment.objects.count()
        self.comment.save()
        new_count = Comment.objects.count()
        self.assertNotEqual(old_count, new_count)