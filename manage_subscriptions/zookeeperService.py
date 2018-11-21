from kazoo.client import KazooClient
from kazoo.client import KazooState
from kazoo.client import KeeperState
from kazoo.retry import KazooRetry
from kazoo.exceptions import NodeExistsError
from json import load
import requests 
import json

zk = KazooClient(hosts='149.165.170.59:2181', read_only=True)
zk.start()
my_ip= str(requests.get('https://ip.42.pl/raw').text)

pass_data={"host":my_ip,"port":"4002"}
pass_data=json.dumps(pass_data).encode('utf-8')


def registerService(path):
    try:
        zk.create(path,value=pass_data, makepath=True)
    except NodeExistsError:
        print('Node already exists so it cannot be created again')


def kafkaServiceDiscovery(path):
    data, stat = zk.get(path)
    data = data.decode("utf-8")
    print("data: %s" % (data))
    return data