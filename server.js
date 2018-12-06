// #region Libraries
/*
 * Get the required libraries
 */
const express = require('express')
const bodyParser = require('body-parser')
const express_graphql = require('express-graphql')
const schema = require('./schema.js')
const cors = require('cors')
const consumer = require('./kafkaconsumer.js')
const zookeeper = require('./zookeeperService.js')
// process.title="nodeJsService"
// #endregion

/*
 * Use the express module to create the server
 */
const app = express();
app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors())
const port = 30001                  // Port to be used to run the service
/*
 * Generate the GraphQL server by setting its Schema and Resolver
 */
app.get('/', (req, res) => {
    res.send('Welcome to the world of Node JS service for Netboox!!')
})

app.use('/graphql', express_graphql({
    schema: schema.schema,
    rootValue: schema.resolver,
    graphiql: true
}))

/*
 * Call Zookeeper client to register itself
 */
async function ZK (port) {
    var text = await zookeeper.zkCreateClient(port)
    console.log(text)
}

/*
 * Call the kafka consumer
 */
consumer.kafkaConsumer()
/*
 * Start the server
 */
const server = app.listen(port, () => {
    console.log(`Express Graphql Server now running on ${server.address().address} :${server.address().port}/graphql`)
    ZK(port)
})
