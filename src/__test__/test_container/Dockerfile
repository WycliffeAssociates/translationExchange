FROM python:3-slim-stretch

COPY . /tmp 

RUN apt-get update \
&& apt-get install -y ffmpeg \
&& cd /tmp \
&& pip install -r requirements.txt
