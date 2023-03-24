FROM ubuntu:latest

RUN apt-get update
RUN apt-get -y install nginx

COPY page01.html /var/www/html/page01.html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
