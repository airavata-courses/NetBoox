from kazoo.client import KazooClient
from kazoo.client import KazooState
from kazoo.client import KeeperState
from kazoo.exceptions import NodeExistsError, NoNodeError, ConnectionLossException
from flask import request, jsonify

from json import load
import requests 
import json

zk = KazooClient(hosts='149.165.170.59:2181', read_only=True)
zk.start()

path = '/NetBoox/SubscriptionService'
# ip= requests.get('https://ip.42.pl/raw').text
ip = '127.0.0.1'
pass_data=json.dumps({"host":ip, "port":4002}).encode('utf-8')

def registerService():
    try:
        zk.create(path,value=pass_data, ephemeral=True, makepath=True)
        print("Python service is registered at: ", path)
    except NodeExistsError:
        print("Node already exists in Zookeeper")

# def kafkaServiceDiscovery(path):
#     try:
#         data, stat = zk.get(path)
#         data = data.decode("utf-8")
#         print("data: ", json.dumps(data))
#         return data
#     except NoNodeError:
#         print("No node exists for the givent {0}".format(path))