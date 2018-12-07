from flask import Flask
from flask import request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
from multiprocessing import Process
from flask import Flask, Response
from kafka import KafkaConsumer
import kafkaconsumer
import sys
import json
import requests
import zookeeperService
import os
import time
from multiprocessing import Process

#now=datetime.datetime.now()
#print("Current time: ", now.strftime("%Y-%m-%d %H:%M"))
port = 30002                # Port number to be used for the service
app=Flask(__name__)
CORS(app)
app.config['MONGO_DBNAME']='subscribers'
app.config['MONGO_URI']= 'mongodb://keerthi4308:mlab4308@ds261302.mlab.com:61302/subscribers'
mongo=PyMongo(app)
users = mongo.db.users

headers = {"Content-type": "application/json"}

def addUser(data):
    data["subscriptionStartDate"] = time.time()
    print("inside function: {0} ".format(data))
    new_id=users.insert(data)
    new_data=users.find_one({'_id':new_id })
    if new_data:
        new_data['_id'] = str(new_data['_id'])
        print("New data is: ", new_data)
    else:
        return jsonify({"message": "Not able to add the user"}), 500

def kconsumer():
        consumer = KafkaConsumer('addSubscriptionProfile', bootstrap_servers='149.165.170.59:9092')
        for message in consumer:
                print("Consumer in Python service is ready!!")
                print ("Topic: ", message.topic)
                print ("Message: ", json.loads(message.value))
                addUser(json.loads(message.value))


t1= Process(target=kconsumer)
t1.daemon=True


def shutdown_server():
    os.environ['PS'] = '0'
    func = request.environ.get('werkzeug.server.shutdown')
    if func is None:
        raise RuntimeError('Not running with Werkzeug server')
    func()

def callProducer(send_msg):
    print("Msg to be sent to producer : {0}" .format(send_msg))
    data = json.loads(zookeeperService.kafkaServiceDiscovery("/NetBoox/KafkaProducer"))
    if data:
        response = requests.post("http://{0}:{1}/NetBoox/KafkaProducer".format(data["host"], data["port"]), json.dumps(send_msg), headers=headers)
        print("resonse: ", response)
        return response
    else:
        print("Zookeeper node was not found for /kafkaProducer")

    # print("Msg : {0}" .format(send_msg))
    # response = requests.post("http://localhost:4004/NetBoox/KafkaProducer", json.dumps(send_msg), headers=headers)
    # print(response)

@app.route('/')
def baseRoute():
    return ("You reached the Python service"), 200
    
@app.route('/manage_subscription/findOneUser/<email>')
def findOneUser(email):
    # print(email)
    new_data = users.find_one({"email": email})
    if new_data:
        new_data['_id'] = str(new_data['_id'])
        return jsonify(new_data), 200
    else:
        return jsonify({"message": "User Not Found"}), 404

@app.route('/manage_subscription/findAllUsers')
def findAllUsers():
    new_data = []
    for user in users.find():
        user['_id'] = str(user['_id'])
        new_data.append(user)
    return jsonify(new_data), 200


@app.route('/manage_subscription/cancelSubscription', methods=['POST'])
def cancelSubscription():
    data = request.get_json()
    email = data.get('email')
    new_data = users.find_one({"email": email})
    if new_data:
        result = users.update_one({"_id": new_data['_id']}, { "$set": { "subscriptionValid" : False, "subscriptionEndDate": time.time() } })
        send_msg= {
            'topic': 'updateProfile',
            'data' : {
                'id': new_data['userProfileId'],
                'email': new_data['email'],
                'subscriptionValid': False
            }
        }
        print(send_msg)
        callProducer(send_msg)
        return jsonify(
            {
                "matched_count": result.matched_count,
                "modified_count": result.modified_count,
                "acknowledged": result.acknowledged
            }
        ), 200
    else:
        return jsonify(
            {
                "message": "No user record found to delete"
            }
        ), 404



@app.route('/shutdown')
def shutdown():
    t1.terminate()
    shutdown_server();
    return "Server shutting down....Khuda Hafiz!!"


if __name__ == "__main__":
    try:
        if os.getenv('PS') != '0':
            os.environ['PS'] = '0'
            zookeeperService.registerService(port)
            t1.start()
    except Exception as e:
        print('Error: ', e)
    app.run(host='0.0.0.0', debug=True, port=port)
    
