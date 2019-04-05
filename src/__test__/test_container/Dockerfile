FROM python:3.6-slim-stretch

COPY . /tmp 
WORKDIR /tmp
RUN echo "deb http://deb.debian.org/debian stretch main non-free\n" >> /etc/apt/sources.list && \
    echo "deb-src http://deb.debian.org/debian stretch main non-free\n" >> /etc/apt/sources.list && \
    apt-get update && \
    apt-get install -y ffmpeg && \
    rm -rf /var/lib/apt/lists/* && \ 
    pip install -r requirements.txt
WORKDIR /
