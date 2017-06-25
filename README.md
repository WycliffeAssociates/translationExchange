# translationDB
A local database to help translators send and access their audio files in an organized and efficient way. The system must be able to operate fully, without any kind of remote internet access. 

## Objective
- The goal of TranslationDB is to be a strong Back-End DBMS for [translationRecorder](https://github.com/WycliffeAssociates/translationRecorder) and a related UI for interfacting with the information on the database.
- The database will be able to interact with the UI using a customized REST API that is running on the local server.
- Store large files in the host machine's "File System", in order to save on space in MongoDB (*and to avoid the 2GB limit on 32-bit machines*)

## Built Using
* [MongoDB](https://www.mongodb.com/) - Chosen because of NoSQL Document Store benefits
* [Python 2.7](https://www.python.org/download/releases/2.7/)
* [PyMongo 3.4](https://api.mongodb.com/python/current/#) - MongoDB Framework for Python
* [Django](https://github.com/django/django) - For running a local Web Server
