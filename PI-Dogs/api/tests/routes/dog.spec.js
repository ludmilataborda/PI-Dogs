/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  name: 'Pug',
  height: '12-13',
  weight: '6 -8'
};

describe('Dogs routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Dog.sync({ force: true })
    .then(() => Dog.create(dog)));
  describe('GET /dogs', () => {
    it('should get 200', () =>
      agent.get('/dogs').expect(200)
    );
  });
  it('responds with a status 400 (bad request) and a string message, if dog does not exist ', () => {
    agent.get('/dogs?name=sajkbsjbsdbjs').expect(400)
    .expect((res) => {
      expect(res.text).to.be.equal('no existe perri con ese nombre')
     })
  });
  it('obtain correct dog name when query is passed', () => {
    agent.get('/dogs?name=Pug').expect(200)
     .expect((res) => {
      expect(res.dataValues[0])
      .to.be.deep.equal({name: 'Pug',
      height: '12-13',
      weight: '6 -8'}) 
  }) 
  });
});





