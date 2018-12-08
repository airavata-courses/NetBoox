FROM python:3

RUN git clone -b 8-microservice-flask https://github.com/airavata-courses/NetBoox.git

WORKDIR /NetBoox/manage_subscriptions/

RUN pip install --upgrade -r requirements.txt

EXPOSE 30002

CMD [ "python", "server.py" ]