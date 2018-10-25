/*
 * Get the required libraries
 */
const expect = require('chai').expect
const url = `localhost:4001`
const request = require('supertest')(url);

/*
 * Perform Testing
 */
describe('GraphQL', () => {
    it('Returns user with valid subscriptions', (done) => {
        request.post('/graphql')
        .send({ query: '{ getUserProfile (subscriptionValid:true) { id firstName phone email } }'})
        .expect(200)
        .end((err,res) => {
            // res will contain array of users that have valid subscription
            if (err) return done(err)
            expect(res.body.data.getUserProfile[0]).to.have.property('id')
            expect(res.body.data.getUserProfile[0]).to.have.property('firstName')
            expect(res.body.data.getUserProfile[0]).to.have.property('phone')
            expect(res.body.data.getUserProfile[0]).to.have.property('email')
            done()
        })
    })

    it('Returns all users', (done) => {
        request.post('/graphql')
        .send({ query: '{ getAllUserProfiles { id firstName phone email } }' })
        .expect(200)
        .end((err, res) => {
            // res will contain array of all users
            if (err) return done(err)
            // at present there are only 5 users in the database
            expect(res.body.data.getAllUserProfiles.length).to.have.greaterThan(2)
            done()
        })  
    })
});