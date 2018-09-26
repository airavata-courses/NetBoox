import requests
import json

# headers = {'Content-type': 'application/json'}

data = {"firstname": "keerthi", "lastname": "naredla","email" : "knaredla@iu.edu", 
"phone": 8123189999, "subscriptionvalid":"True"}

# response = requests.post("http://127.0.0.1:5000/manage_subscription/add", headers, data)
# if(response.status_code == 200):
#     print("User Added")
#     print(response.content)
# else:
#     print("Error occured")
#     print(response.status_code)

response = requests.get("http://127.0.0.1:5000/manage_subscription/findOneUser/knaredla@iu.edu")
if(response.status_code==200):
    print("Data fetch Successful from findOneUser endpoint")
    print(response.content)
else:
    print("Error occured")
    print(response.status_code)

response = requests.get("http://127.0.0.1:5000/manage_subscription/findAllUsers")
if(response.status_code==200):
    print("Data fetch Successful from findAllUsers endpoint")
    print(response.content)
else:
    print("Error occured")
    print(response.status_code)

response = requests.get("http://127.0.0.1:5000/manage_subscription/deleteUser/knaredla@iu.edu")
if(response.status_code==200):
    print("User Deleted")
    print(response.content)
else:
    print("Error occured")
    print(response.status_code)
