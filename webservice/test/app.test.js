const request = require('supertest');
const chai = require('chai');
const { app } = require('../app'); // Import your app

const expect = chai.expect;

describe('GET /movies', () => {
    let server;

    before((done) => {
        server = app.listen(3000, done); // Use a different port for testing
    });

    after((done) => {
        server.close(done);
    });

    it('responds with json', (done) => {

        request(app)
            .get('/movies?search=Sonic')
            .end((err, res) => { 
                if (err) return done(err);
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.an('array');
                expect(res.body.length).to.equal(10);
                done();
            });
    });

    it('responds with error when search parameter is missing', (done) => {
        request(app)
            .get('/movies')
            .end((err, res) => { 
                if (err) return done(err);
                expect(res.statusCode).to.equal(400);
                expect(res.body).to.have.property('error');
                done();
            });
    });

    it('responds with error when search parameter is empty', (done) => {
        request(app)
            .get('/movies?search=')
            .end((err, res) => { 
                if (err) return done(err);
                expect(res.statusCode).to.equal(400);
                expect(res.body).to.have.property('error');
                done();
            });
    });
});
