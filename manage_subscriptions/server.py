from flask import Flask
from flask import request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
from bson.json_util import dumps
import sys
import json

app=Flask(__name__)
CORS(app)
app.config['MONGO_DBNAME']='subscribers'
app.config['MONGO_URI']= 'mongodb://keerthi4308:mlab4308@ds261302.mlab.com:61302/subscribers'
mongo=PyMongo(app)
users = mongo.db.users

@app.route('/manage_subscription/addUser', methods=['POST'])
def addUser():
    data = request.get_json()
    structure={
        "firstname":data.get('firstname'),
        "lastname":data.get('lastname'),
        "email": data.get('email'),
        "phone": data.get('phone'),
        "subscriptionValid": data.get('subscriptionValid')
    }
    new_id=users.insert(structure)
    new_data=users.find_one({'_id':new_id })
    if new_data:
        new_data['_id'] = str(new_data['_id'])
        return jsonify(new_data),200
    else:
        return jsonify({"message": "Not able to add the user"}), 500
    
@app.route('/manage_subscription/findOneUser/<email>')
def findOneUser(email):
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
    print(data)
    email = data.get('email')
    new_data = users.find_one({"email": email})
    if new_data:
        result = users.update_one({"_id": new_data['_id']}, { "$set": { "subscriptionvalid" : False } })
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

   
if __name__ == "__main__":
    app.run(debug=True, port=4002)
