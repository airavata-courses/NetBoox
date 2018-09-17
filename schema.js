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
        getUserProfile (_id: String, email: String, firstName: String, lastName: String, subscriptionValid: Boolean, 
            subscriptionEnds: String): [UserProfile] 

        getAllUserProfiles : [UserProfile]
    },

    type Mutation {
        updateUserProfile (_id: String!, firstName: String, lastName: String, email: String, phone: String, 
            subscriptionValid: Boolean, subscriptionEnds: String, readList: [String]): UserProfile

        addUserProfile (firstName: String!, lastName: String!, phone: String, email: String!, 
            subscriptionValid: Boolean!, subscriptionEnds: String!, readList: [String]): UserProfile
    },

    type UserProfile {
        _id: String,
        firstName: String,
        lastName: String,
        email: String!,
        phone: String,
        subscriptionValid: Boolean!,
        subscriptionEnds: String!,
        readList: [String]
        errorMsg: String
    }
 `)

 /*
 * Create the root resolver for the Schema
 */
 const resolver = {
    getUserProfile: UserProfile.getUserProfile, 
    getAllUserProfiles:UserProfile.getAllUserProfiles,
    updateUserProfile: UserProfile.updateUserProfile,
    addUserProfile: UserProfile.addUserProfile
 }

/*
 * Export the schema and resolver
 */
 module.exports = {
    schema,
    resolver
}