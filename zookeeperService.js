var zk = require('node-zookeeper-client')
var publicIp = require('public-ip')

var url = '149.165.170.59:2181' // Zookeeper IP address
var path = '/NetBoox/UserProfileService'            // The path to be registered as node in ZK
var client

module.exports = {
    zkCreateClient: async function (port) {
        client = zk.createClient(url, {retries: 2})  // Connect ZK
        client.connect()

        //var ip = '127.0.0.1'
        var ip = await publicIp.v4()
        const buffer = new Buffer.from(JSON.stringify({
            host: ip,
            port: port
        }))
        try {
            return new Promise((resolve, reject) => {
                client.create(path, buffer, zk.CreateMode.EPHEMERAL, function (error, path) {
                    if(error){
                        if (error.code == zk.Exception.NODE_EXISTS) 
                            resolve("Node already exists in Zookeeper")
                        else 
                            reject(error)
                    }
                    else resolve(`Path: ${path} is successfully created.`)
                })
            })
        }
        catch (e) {
            console.log(e)
            return
        }
    },

// Code is only till up, below code is obsolete


    checkExistance: async function (serviceName) {
        try {
            return new Promise((resolve, reject) => {
                client.exists(serviceName, (error, stat)  => {
                    if(error) reject(error)

                    if(stat) 
                        resolve(true)
                    else
                        resolve(false)
                })
            })
        }
        catch (e) {
            console.log(e)
            return
        }
    },

    serviceDiscovery: async function (serviceNode) {
        try {
            return new Promise((resolve, reject) => {
                client.getData(serviceNode, (error, data, stat)  => {
                    if(error){
                        if (error.code == zk.Exception.NO_NODE) resolve(null)
                        else reject(error)
                    }
                    else resolve(JSON.parse(data.toString('utf8')))
                })
            })
        }
        catch (e) {
            console.log(e)
            return
        }
    }
}