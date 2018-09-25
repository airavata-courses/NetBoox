from flask import Flask
from flask import request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS

app=Flask(__name__)
CORS(app)
app.config['MONGO_DBNAME']='subscribers'
app.config['MONGO_URI']= 'mongodb://keerthi4308:mlab4308@ds261302.mlab.com:61302/subscribers'
mongo=PyMongo(app)

@app.route('/manage_subscription/add', methods=['POST'])
def add():
    sub=mongo.db.users
    data = request.get_json() 
    structure={
        "firstname":data.get('firstname'),
        "lastname":data.get('lastname'),
        "email": data.get('email'),
        "phone": data.get('phone'),
        "subscriptionValid": data.get('subscriptionValid')
    }
    new_id=sub.insert(structure)
    new_data=sub.find_one({'_id':new_id })
    output={'firstname':new_data['firstname'],'lastname':new_data['lastname'],'email':new_data['email'],'phone':new_data['phone'],'subscriptionValid': new_data['subscriptionValid']}
    return jsonify({'result':output}),200
    
@app.route('/manage_subscription/find/<email>')
def find(email):
        new_data = mongo.db.users.find_one({"email": email})
        # output={'firstname':new_data['firstname'],'email':new_data['email'],'phone':new_data['phone'],'subscriptionValid': new_data['subscriptionValid']}
        new_data['_id']=str(new_data['_id'])
        return jsonify(new_data),200
        
@app.route('/manage_subscription/delete/<email>')
def delete(email):
         mongo.db.users.delete_one({"email": email})
         return jsonify({'message': 'record deleted'}), 200

   
if __name__ == "__main__":
    app.run(debug=True)
