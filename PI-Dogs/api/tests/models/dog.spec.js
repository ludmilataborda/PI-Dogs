const { Dog, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Dog model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Dog.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Dog.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Dog.create({ name: 'Pug' });
      });
    });
     describe('weight', () => {
      it('should throw an error if weight is null', (done) => {
        Dog.create({})
          .then(() => done(new Error('It requires a valid weight')))
          .catch(() => done());
      });
      it('should work when its text', () => {
        Dog.create({ name: 'Mi perri', weight:'15-16' });
      }); 
      it('should throw an error if weight is not a string', (done) => {
        Dog.create({ name: 'Mi perri', weight:15-16 })
          .then(() => done(new Error('weight must be a string')))
          .catch(() => done());
      });
    });
    describe('image', () => {
      it('should work if image is not passed', () => {
       Dog.create({ name: 'Mi perri', weight:'15-16'})
      });
     
    }); 
  });
});

