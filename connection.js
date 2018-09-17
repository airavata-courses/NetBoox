/* 
 * Get the required libraries
 */
const mongoose = require('mongoose')

/*
 *URL for MongoDB
 */
const dbUrl = 'mongodb://spanchal:Panchal8793@ds153980.mlab.com:53980/learning-node'

/*
 *Create the connection and DB session
 */
const db_session = mongoose.connect(dbUrl, { useNewUrlParser: true }, (err) => {
    if (err) {
        console.log('An error has occured which is as follows: ')
        throw err    
    }
    console.log('Mongo DB connection established successfully')
})

/*
 *Export the session
 */
module.exports = {
    mongoose
}