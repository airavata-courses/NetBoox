from flask import Flask
from flask import request, jsonify
from flask_pymongo import PyMongo

app=Flask(__name__)
app.config['MONGO_DBNAME']='manage-subscriptions'
app.config['MONGO_URI']= 'mongodb://<dbuser>:<dbpassword>@ds161312.mlab.com:61312/manage-subscriptions'

mongo=PyMongo(app)

@app.route('/manage_subscription/<useremail>', methods=['GET', 'POST', 'UPDATE'])
def manage_subscription(useremail):
    if request.method == 'GET':
        query = request.args
        data = mongo.db.users.find_one(query)
        return jsonify(data),200

    data = request.get_json()
    if request.method == 'POST':
        if data.get('email', None) is not None:
            mongo.db.users.insert_one(data)
            return jsonify({'message': 'Success'}), 200
        else:
            return jsonify({'message': 'Bad request'}), 400

    if request.method == 'UPDATE':
        if data.get('query', {}) != {}:
            mongo.db.users.update_one(
                data['query'], {'$set': data.get('payload', {})})
            return jsonify({'message': 'record updated'}), 200
        else:
            return jsonify({'message': 'Bad request'}), 400


   
if __name__ == "__main__":
    app.run(debug=True)
