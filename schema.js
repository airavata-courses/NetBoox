/*
 * Get the required libraries
 */
 const { buildSchema } = require('graphql')
 const UserProfile = require('./Models/UserProfile')

 /*
 * Generate the GraphQL Schema
 */
 const schema = buildSchema (`
    type Query {
        getUserProfile (id: String, email: String, firstName: String, lastName: String, subscriptionValid: Boolean, 
            subscriptionStarts: String): [UserProfile] 

        getAllUserProfiles : [UserProfile]

        verifyLogin (email: String!, password: String!): UserProfile
    },

    type Mutation {
        updateUserProfile (id: String!, firstName: String, lastName: String, email: String, password: String, phone: String, 
            subscriptionValid: Boolean, subscriptionStarts: String, readList: [String]): UserProfile

        addUserProfile (firstName: String!, lastName: String!, phone: String, email: String!, password: String!,
            subscriptionValid: Boolean!, subscriptionStarts: String!, readList: [String]): UserProfile
    },

    type UserProfile {
        id: String,
        firstName: String,
        lastName: String,
        email: String!,
        password: String,
        phone: String,
        subscriptionValid: Boolean!,
        subscriptionStarts: String!,
        readList: [String],
        successMsg: String,
        errorMsg: String,
        errorFlag: Boolean
    }
 `)

 /*
 * Create the root resolver for the Schema
 */
 const resolver = {
    getUserProfile: UserProfile.getUserProfile, 
    getAllUserProfiles:UserProfile.getAllUserProfiles,
    updateUserProfile: UserProfile.updateUserProfile,
    addUserProfile: UserProfile.addUserProfile,
    verifyLogin: UserProfile.verifyLogin
 }

/*
 * Export the schema and resolver
 */
 module.exports = {
    schema,
    resolver
}