/*
 * Get the required libraries
 */
const mongoose = require('../connection.js').mongoose
const crypto = require('crypto')
const axios = require('axios')
const zk = require('../zookeeperService.js')
// #region Helper functions
/*
 * Helper functions for the schema
 */
function toTitleCase(data)  {  
    if (data){
        return data.replace(/\w\S*/g, (txt) => {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        })  
    }
}

function toPhoneNumberFormat(phoneNumber) {
    if (phoneNumber){
        var cleaned = ('' + phoneNumber).replace(/\D/g, '')
        var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
        if (match) {
            var intlCode = (match[1] ? '+1 ' : '')
            return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
        }
        return null
    }
}

function toObjectId(stringId) {
    if(stringId) return mongoose.Schema.Types.ObjectId(stringId)
}

function objectIdToString (data) {
    if (data) {
        return data.toString()
    }
}

function stringToDate (data) {
    if (data) return Date.parse(data)
}

function dateToString (data) {
    if (data) return data.toString()
}
/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
function genRandomString (length){
    return crypto.randomBytes(Math.ceil(length/2))
        .toString('hex') /** convert to hexadecimal format */
        .slice(0,length);   /** return required number of characters */
}
/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
function sha512 (password, salt){
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        password:value
    }
}

function saltHashPassword(userpassword, salt) {
    if (!salt)
        salt = genRandomString(16); /** Gives us salt of length 16 */
    return sha512(userpassword, salt);
}
// #endregion


/*
 * Helper function for Zookeeper and Kafka
 */
async function sendToKafkaProducer(payload){
    try {    
        // var data = await zk.serviceDiscovery("/kafkaProducer")
        // console.log(`kafkaProducer is running on  ${data.host}:${data.port}`)
        // axios.post(`http://${data.host}:${data.port}/kafkaProducer`, payload)
        axios.post(`http://localhost:4004/NetBoox/KafkaProducer`, payload)
        // return
    }
    catch (e) {
        console.log(e)
    }
}

/*
 * Create the required schema of the data
 */
const ObjectId = mongoose.Schema.Types.ObjectId

const userProfileSchema = new mongoose.Schema({
    firstName: {type: String, set: toTitleCase},
    lastName: {type: String, set: toTitleCase},
    email: {type: String, required: true, unique: true, lowercase: true},
    password: String,
    salt: String,
    phone: {type: String, set: toPhoneNumberFormat},
    subscriptionValid: Boolean,
    subscriptionEnds:{type: Date, set: stringToDate, get: dateToString},
    readList: [{type: ObjectId, set: toObjectId, get: objectIdToString}]
})

// #region Data manipulation function
/*
 * Export the functions
 */
module.exports = {
    /*
    * Generate the model from schema
    */
    UserProfile : mongoose.model('UserProfiles', userProfileSchema),

    /*
    * Functions to fetch the required details from DB
    */
    getUserProfile: async function (args) {
        var userProfile = await module.exports.UserProfile.find(args, (err) => {
            if (err) {
                return JSON.parse(
                    JSON.stringify(
                        {
                            errorMsg: err,
                            errorFlag: true
                        }
                    )
                )
            }
        })
        userProfile = JSON.parse(JSON.stringify(userProfile))
        for (x in userProfile) {
            userProfile[x]["id"] = userProfile[x]._id
            userProfile[x]["errorFlag"] = false
        }
        return userProfile
    },

    getAllUserProfiles: async function () {
        // await module.exports.UserProfile.remove({'firstName': 'Aakash'}, (err) => {
        //     if (err) {
        //         return JSON.parse(
        //             JSON.stringify(
        //                 {
        //                     errorMsg: err,
        //                     errorFlag: true
        //                 }
        //             )
        //         )
        //     }
        // })
        var userProfile = await module.exports.UserProfile.find({}, (err) => {
            if (err) {
                return JSON.parse(
                    JSON.stringify(
                        {
                            errorMsg: err,
                            errorFlag: true
                        }
                    )
                )
            }
        })
        userProfile = JSON.parse(JSON.stringify(userProfile))
        for (x in userProfile) {
            userProfile[x]["id"] = userProfile[x]._id
            userProfile[x]["errorFlag"] = false
        }
        return userProfile
    },

    updateUserProfile: async function(args) {
        if (args.id){
            var id = args.id
            delete args.id // Removed id from args as args will be used to update other fields
            if (args.password) {
                // If user requested to update the password, then first get the salt and then hash the new password with it and then update
                var userProfile = await module.exports.UserProfile.findById(id, (err) => {
                    if (err) {
                        return JSON.parse(
                            JSON.stringify(
                                { 
                                    errorMsg: err,
                                    errorFlag: true
                                }
                            )
                        )
                    }    
                })
                if(userProfile.salt){
                    var hashedPassword = saltHashPassword(args.password, userProfile.salt)
                    args.password = hashedPassword.password
                }else {
                    var hashedPassword = saltHashPassword(args.password)
                    args.password = hashedPassword.password
                    args.salt = hashedPassword.salt
                }
            }
            // Options = new : true is to send the updated document of the user rather then the old one
            var options = { new: true }
            // Finally update the data
            var result = await module.exports.UserProfile.findByIdAndUpdate(id, args, options, (err) => {
                if (err) {
                    return JSON.parse(
                        JSON.stringify(
                            { 
                                errorMsg: err,
                                errorFlag: true
                            }
                        )
                    )
                }
            })
            if (result){
                result = JSON.parse(JSON.stringify(result))
                result["id"] = result._id
                result["successMsg"] = "User data updated successfully"
                result["errorFlag"] = false
                return result
            }
            return JSON.parse(
                JSON.stringify(
                    { 
                        errorMsg: "Unable to update due to user not found",
                        errorFlag: true
                    }
                )
            )
        }
        return JSON.parse(
            JSON.stringify(
                { 
                    errorMsg: "Id is required to update data",
                    errorFlag: true
                }
            )
        )
    },

    addUserProfile: async function(args) {
        var hashedPassword = saltHashPassword(args.password)
        args.password = hashedPassword.password
        args.salt = hashedPassword.salt
        var userProfile = new module.exports.UserProfile(args)
        var result = await userProfile.save()
        if (result){
            result = JSON.parse(JSON.stringify(result))
            result["id"] = result._id
            result["successMsg"] = "User data saved successfully"
            result["errorFlag"] = false
            var payload = {
                topic: 'addSubscriptionProfile',
                data: {
                    userProfileId: result.id,
                    subscriptionValid: result.subscriptionValid
                }
            }
            // Send the data to kafka Producer to be sent to the manage subscription service to add user profile there too.
            sendToKafkaProducer(payload)
            return result
        }
        return JSON.parse(
            JSON.stringify(
                { 
                    errorMsg: "Unable to save data",
                    errorFlag: true
                }
            )
        )
    },

    verifyLogin: async function(args) {
        var userProfile = await module.exports.getUserProfile({email: args.email})
        if (userProfile.length == 1) {
            var hashedPassword = saltHashPassword(args.password, userProfile[0].salt)
            if (hashedPassword.password === userProfile[0].password && userProfile[0].subscriptionValid){
                return JSON.parse(
                    JSON.stringify(
                        {
                            successMsg: "User authenticated successfully",
                            errorFlag: false
                        }
                    )
                )
            }
            return JSON.parse(
                JSON.stringify(
                    {
                        errorMsg: "Incorrect password provided",
                        errorFlag: true
                    }
                )
            )
        }
        else if (data.length > 1){
            return JSON.parse(
                JSON.stringify(
                    { 
                        errorMsg: "There cannot be more than one user of same email id",
                        errorFlag: true
                    }
                )
            )
        }
        return JSON.parse(
            JSON.stringify(
                {
                    errorMsg: "User not found. Please check your email id or register yourself",
                    errorFlag: true
                }
            )
        )
    }
}
// #endregion