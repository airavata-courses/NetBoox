import requests
import json

headers = {"Content-type": "application/json"}

data = {"firstname":"Keerthi", "lastname":"Naredla", "email":"knaredla@iu.edu", "phone":"8123189999", "subscriptionvalid":True }

response = requests.post("http://127.0.0.1:4002/manage_subscription/addUser", json.dumps(data), headers=headers)
if(response.status_code == 200):
    print("User Added")
    print(response.content)
else:
    print("Error occured: ", response.content)
    print(response.status_code)

response = requests.get("http://127.0.0.1:4002/manage_subscription/findOneUser/knaredla@iu.edu")
if(response.status_code==200):
    print("Data fetch Successful from findOneUser endpoint")
    print(response.content)
else:
    print("Error occured: ", response.content)
    print(response.status_code)

response = requests.get("http://127.0.0.1:4002/manage_subscription/findAllUsers")
if(response.status_code==200):
    print("Data fetch Successful from findAllUsers endpoint")
    print(response.content)
else:
    print("Error occured: ", response.content)
    print(response.status_code)

delete_data = {
    "email": "knaredla@iu.edu"
}
response = requests.post("http://127.0.0.1:4002/manage_subscription/cancelSubscription", json.dumps(delete_data), headers=headers)
if(response.status_code==200):
    print("Subscription cancelled")
    print(response.content)
else:
    print("Error occured: ", response.content)
    print(response.status_code)
