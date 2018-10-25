from kazoo.client import KazooClient
from kazoo.client import KazooState
from kazoo.client import KeeperState

from json import load
import requests 
import json

zk = KazooClient(hosts='149.165.170.59:2181', read_only=True)
zk.start()

my_ip= requests.get('https://ip.42.pl/raw').text
print(my_ip)
pass_data={"host":"127.0.0.1","port":4002}
pass_data=json.dumps(pass_data).encode('utf-8')


def registerService(path):
    zk.create(path,value=pass_data, makepath=True)


def kafkaServiceDiscovery(path):
    data, stat = zk.get(path)
    data = data.decode("utf-8")
    print("data: %s" % (data))
    return data