FROM python:3.8.2-slim-buster

RUN apt update && apt install -y \
  python3-tk \
  ghostscript \
  libglib2.0-0 libsm6 libxext6

RUN pip install camelot-py[cv] pandas boto3

WORKDIR /app

ADD *.py .