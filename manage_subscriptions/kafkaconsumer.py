from flask import Flask, Response
from kafka import KafkaConsumer
import function
import json


def kconsumer():
    print("idhar aaya 1")
    consumer = KafkaConsumer('addSubscriptionProfile')
    print("idhar aaya 2")
    # print(consumer)
    for message in consumer:
        print("it works")
        print (message.topic)
        print (json.loads(message.value))
        function.addUser(json.loads(message.value))

# if __name__ == "__main__":
#     app.run(debug=True)