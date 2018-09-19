from flask import Flask
from flask import request, jsonify
from flask_pymongo import PyMongo

app=Flask(__name__)
app.config['MONGO_DBNAME']='subscribers'
app.config['MONGO_URI']= 'mongodb://keerthi4308:mlab4308@ds261302.mlab.com:61302/subscribers'
mongo=PyMongo(app)

@app.route('/manage_subscription/add', methods=['POST'])
def add():
    sub=mongo.db.users
    data = request.get_json() 
    structure={
        "email": data.get('email'),
        "phone": data.get('phone'),
        "subscriptionValid": data.get('subscriptionValid')
    }
    new_id=sub.insert(structure)
    new_data=sub.find_one({'_id':new_id })
    output={'email':new_data['email'],'phone':new_data['phone'],'subscriptionValid': new_data['subscriptionValid']}
    return jsonify({'result':output}),200
    
@app.route('/manage_subscription/find/<useremail>')
def find(useremail):
    if request.method == 'GET':
        new_data = mongo.db.users.find_one({"email": useremail})
        output={'email':new_data['email'],'phone':new_data['phone'],'subscriptionValid': new_data['subscriptionValid']}
        return jsonify({'result': output}),200

@app.route('/manage_subscription/delete/<email>', methods=['DELETE'])
def delete(email):
        data = request.get_json()
        response = mongo.db.users.delete_one({"email": email})
        return jsonify({'message': 'record deleted'}), 200


   
if __name__ == "__main__":
    app.run(debug=True)
