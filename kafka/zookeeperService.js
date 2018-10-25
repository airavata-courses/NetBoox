var zk = require('node-zookeeper-client')
var publicIp = require('public-ip')

var url = '149.165.170.59:2181' // Zookeeper IP address
var path = '/kafkaProducer'            // The path to be registered as a node in ZK
var client

module.exports = {
    zkCreateClient: async function (server) {
        client = zk.createClient(url, {retries: 2})  // Connect ZK
        client.connect()
        
 
        var ip = await publicIp.v4()
        const buffer = new Buffer.from(JSON.stringify({
            host: ip,
            port: server.address().port
        }))

        await client.create(path, buffer, zk.CreateMode.EPHEMERAL, function (error) {
            if (error) {
                console.log('Failed to create node: %s due to: %s.', path, error);
            } else {
                console.log('Node: %s is successfully created.', path);
            }
        });
    },

    checkExistance: async function (serviceName) {
        return await client.exists(serviceName, function (error, stat) {
            if (error) {
                console.log(error.stack);
                return false
            }
        
            if (stat) {
                console.log('Node exists.');
                return true
            } else {
                console.log('Node does not exist.');
                return false
            }
        });
    },

    serviceDiscovery: async function (serviceNode) {
        return await client.getData(serviceNode, function (error, data, stat) {
            if (error) {
                console.log(error.stack);
                return false
            }
            data = data.toString('utf8')
            console.log('Got data: ', data)
            return data
        })
    }
}