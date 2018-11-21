from flask import Flask
from flask import request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
import kafkaconsumer
import sys
import json
import requests
import zookeeperService
import os
import datetime
from multiprocessing import Process

now=datetime.datetime.now()
print("Current time: ", now.strftime("%Y-%m-%d %H:%M"))

app=Flask(__name__)
CORS(app)
app.config['MONGO_DBNAME']='subscribers'
app.config['MONGO_URI']= 'mongodb://keerthi4308:mlab4308@ds261302.mlab.com:61302/subscribers'
mongo=PyMongo(app)
users = mongo.db.users
t1= Process(target=kafkaconsumer.kconsumer)
t1.daemon=True



headers = {"Content-type": "application/json"}
#producer related stuff
#producer =KafkaProducer(bootstrap_servers=['localhost:4004'],value_serializer=lambda m:json.dumps(m).encode('ascii'))

# @app.route('/manage_subscription/addUser', methods=['POST'])
def addUser(data):
    # data = request.get_json()
    # structure={
    #     "firstname":data.get('firstname'),
    #     "lastname":data.get('lastname'),
    #     "email": data.get('email'),
    #     "phone": data.get('phone'),
    #     "subscriptionValid": data.get('subscriptionValid')
    # }
    print("inside function: {0} " .format(data))
    
    new_id=users.insert(data)
    new_data=users.find_one({'_id':new_id })
    if new_data:
        new_data['_id'] = str(new_data['_id'])
        print(jsonify(new_data))
    else:
        return jsonify({"message": "Not able to add the user"}), 500
    
@app.route('/manage_subscription/findOneUser/<email>')
def findOneUser(email):
    print(email)
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
def deleteUser():
    data = request.get_json()
    print("Data: ", data)
    email = data.get('email')
    new_data = users.find_one({"email": email})
    if new_data:
        result = users.update_one({"_id": new_data['_id']}, { "$set": { "subscriptionValid" : False } })
        send_msg= {
            'topic': 'updateProfile',
            'data' : {
                'id': new_data['userProfileId'], 
                'email':new_data['email'],
                'subscriptionValid':False
            }
        }
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


def callProducer(send_msg):
    print("Msg : {0}" .format(send_msg))
    # data = zookeeperService.kafkaServiceDiscovery("/kafkaProducer")
    # response = requests.post("http://{0}:{1}/kafkaproducer".format(data.host, data.port), json.dumps(send_msg), headers=headers)
    response=requests.post("http://localhost:4004/kafkaproducer",json.dumps(send_msg),headers=headers)
    print(response)
    return response

def shutdown_server():
    os.environ['PS'] = "0"
    func = request.environ.get('werkzeug.server.shutdown')
    if func is None:
        raise RuntimeError('Not running with the Werkzeug Server')
    func()

@app.route('/shutdown', methods=["POST"])
def shutdown():
    t1.terminate()
    shutdown_server()
    return "shutdown.."

if __name__ == "__main__":
    try:
        if(os.getenv('PS')!="0"):
            os.environ['PS'] = "0"
            zookeeperService.registerService("/pythonFlask")
            t1.start()
    except Exception as e:
        print("error: ", e)
    app.run(debug=True, port=4002)

   