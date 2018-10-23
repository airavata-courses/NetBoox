from flask import Flask, Response
from kafka import KafkaConsumer
import function
import json


def kconsumer():
    consumer = KafkaConsumer('addSubscriptionProfile')
    for message in consumer:
        # print("it works")
        # print (message.topic)
        # print (json.loads(message.value))
        function.addUser(json.loads(message.value))

