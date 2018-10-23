from flask import Flask
from flask import request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
from bson.json_util import dumps
# from kafka import KafkaProducer
import kafkaconsumer
import sys
import json
import requests

app=Flask(__name__)
CORS(app)
app.config['MONGO_DBNAME']='subscribers'
app.config['MONGO_URI']= 'mongodb://keerthi4308:mlab4308@ds261302.mlab.com:61302/subscribers'
mongo=PyMongo(app)
users = mongo.db.users

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
    # print(data)
    email = data.get('email')
    new_data = users.find_one({"email": email})
    if new_data:
        result = users.update_one({"_id": new_data['_id']}, { "$set": { "subscriptionvalid" : False } })
        send_msg= {
            'topic': 'updateProfile',
            'data' : {
                'id': "5bb918ea77a2c97118650071",
                'email':data.get('email'),
                'phone':data.get('phone'),
                'subscriptionValid':data.get('subscriptionValid')
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
    response = requests.post("http://127.0.0.1:4004/kafkaproducer", json.dumps(send_msg), headers=headers)
    print(response)
    return response

kafkaconsumer.kconsumer()

if __name__ == "__main__":
    app.run(debug=True, port=4002)
