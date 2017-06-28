from rest_framework import parsers

class MP3StreamParser(parsers.BaseParser):
    """
    stream parser.
    """

    def parse(self, stream, media_type='audio/mp3', parser_context=None):
        """
        Simply return a audio representing the body of the request.
        """
        return stream.read()