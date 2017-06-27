from django.test import TestCase
from .models import File

class ModelTestCase(TestCase):
    """This class defines the test suite for the file model."""

    def setUp(self):
        """Define the test client and other test variables."""
        self.file_location = "uploads/file.zip"
        self.file = File(location=self.file_location)