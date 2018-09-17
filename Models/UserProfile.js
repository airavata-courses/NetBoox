/*
 * Get the required libraries
 */
const mongoose = require('../connection.js').mongoose

// #region Helper functions
/*
 * Helper functions for the schema
 */
// function toLower (data) {
//     if (data) return data.toLowerCase();
// }

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
// #endregion

/*
 *Create the required schema of the data
 */
const ObjectId = mongoose.Schema.Types.ObjectId

const userProfileSchema = new mongoose.Schema({
    firstName: {type: String, set: toTitleCase},
    lastName: {type: String, set: toTitleCase},
    email: {type: String, required: true, unique: true, lowercase: true},
    phone: {type: String, set: toPhoneNumberFormat},
    subscriptionValid: Boolean,
    subscriptionEnds:{type: Date, set: stringToDate, get: dateToString},
    readList: [{type: ObjectId, set: toObjectId, get: objectIdToString}]
})

/*
 *Generate the model from schema
 */
const UserProfile = mongoose.model('UserProfiles', userProfileSchema)

/*
 * Functions to fetch the required details from DB
 */
const getUserProfile = async function (args) {
    var userProfile = await UserProfile.find(args, (err) => {
        if (err) {
            return { 
                errorMsg: err
            }
        }
    })
    return JSON.parse(JSON.stringify(userProfile))
}

const getAllUserProfiles = async function () {
    var userProfile = await UserProfile.find({}, (err) => {
        if (err) {
            return { 
                errorMsg: err
            }
        }
    })
    return JSON.parse(JSON.stringify(userProfile))
}

const updateUserProfile = async function(args) {
    if (args._id){
        var id = args._id
        delete args._id
        var result = await UserProfile.findByIdAndUpdate(id, args, (err) => {
            if (err) {
                return { 
                    errorMsg: err
                }
            }
        })
        return JSON.parse(JSON.stringify(result))
    }
    return { 
        errorMsg: "Id is required to update data"
    }
}

const addUserProfile = async function(args) {
    var userProfile = new UserProfile(args)
    return JSON.parse(JSON.stringify(await userProfile.save()))
}

/*
 *Export the model
 */
module.exports = {
    UserProfile,
    getUserProfile,
    getAllUserProfiles, 
    updateUserProfile,
    addUserProfile
}