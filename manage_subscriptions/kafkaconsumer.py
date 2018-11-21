from flask import Flask, Response
from kafka import KafkaConsumer
import function
import json


def kconsumer():
        consumer = KafkaConsumer('addSubscriptionProfile',bootstrap_servers=['149.165.170.59:9092'])
        print('Kafka Consumer started...')
        for message in consumer:
                print("it works")
                print ("Topic: ", message.topic)
                print ("Message: ", json.loads(message.value))
                function.addUser(json.loads(message.value))

