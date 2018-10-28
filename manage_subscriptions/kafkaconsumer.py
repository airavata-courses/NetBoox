from flask import Flask, Response
from kafka import KafkaConsumer
import function
import json


def kconsumer():
        consumer = KafkaConsumer('addSubscriptionProfile', bootstrap_servers='149.165.170.59:9092', api_version=(0, 10, 1))
        for message in consumer:
                print("it works")
                print (message.topic)
                print (json.loads(message.value))
                function.addUser(json.loads(message.value))

