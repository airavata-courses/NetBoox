// #region Libraries
/*
 * Get the required libraries
 */
const express = require('express')
const bodyParser = require('body-parser')
const express_graphql = require('express-graphql')
const schema = require('./schema.js')
// #endregion

/*
 * Use the express module to create the server
 */
const app = express();
app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

/*
 * Generate the GraphQL server by setting its Schema and Resolver
 */
app.use('/graphql', express_graphql({
    schema: schema.schema,
    rootValue: schema.resolver,
    graphiql: true
}))

/*
 * Start the server
 */
const server = app.listen(4000, () => {
    console.log(`Express Graphql Server now running on localhost:${server.address().port}/graphql`)
})