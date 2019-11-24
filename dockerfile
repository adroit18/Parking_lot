FROM ubuntu 

RUN mkdir /app
COPY . /app
WORKDIR /app