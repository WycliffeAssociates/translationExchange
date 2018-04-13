FROM python:3-slim-stretch

COPY . /tmp 

RUN apt-get update \
&& cd /tmp \
&& pip install -r requirements.txt
