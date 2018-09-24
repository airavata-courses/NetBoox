/*
 * Get the required libraries
 */
const expect = require('chai').expect
const url = `localhost:4000`
const request = require('supertest')(url);

/*
 * Perform Testing
 */
describe('GraphQL', () => {
    it('Returns user with valid subscriptions', (done) => {
        request.post('/graphql')
        .send({ query: '{ getUserProfile (subscriptionValid:true) { _id firstName phone email } }'})
        .expect(200)
        .end((err,res) => {
            // res will contain array of users that have valid subscription
            if (err) return done(err)
            expect(res.body.data.getUserProfile[0]).to.have.property('_id')
            expect(res.body.data.getUserProfile[0]).to.have.property('firstName')
            expect(res.body.data.getUserProfile[0]).to.have.property('phone')
            expect(res.body.data.getUserProfile[0]).to.have.property('email')
            done()
        })
    })

    it('Returns all users', (done) => {
        request.post('/graphql')
        .send({ query: '{ getAllUserProfiles { _id firstName phone email } }' })
        .expect(200)
        .end((err, res) => {
            // res will contain array of all users
            if (err) return done(err)
            // at present there are only 3 users in the database
            expect(res.body.data.getAllUserProfiles).to.have.lengthOf(3)
            done()
        })  
    })
});