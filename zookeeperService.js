/*
 * Get the required libraries
 */
var zk = require('node-zookeeper-client')

 // Zookeeper IP address
var url = '149.165.170.59:2181'

// Create Zookeeper Client
var client = zk.createClient(url, {retries: 2})

// Connect ZK
client.connect()

module.exports = {
    /*
     * Check whether the node exists or not
     */
    checkNodeExists: (path) => {
        try {
            return new Promise((resolve, reject) => {
                client.exists(path, (error, stat)  => {
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
            return false
        }
    },

    /*
     * Get the details of the service based on the path provided
     */
    getNodeDetails: (path) => {
        try {
            return new Promise((resolve, reject) => {
                client.getData(path, (error, data, stat)  => {
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
            return 'No results found'
        }
    }
}