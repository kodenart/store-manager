const { expect } = require('chai')
const sinon = require('sinon')

const salesModel = require('../../../models/salesModel')
const connection = require('../../../models/connection')

describe('Unit testing the saleModel', () => {

  before(async () => {
    const execute = [[{ a: 1 }, { b: 2 }, { c: 3 }], [], []]; 

    sinon.stub(connection, 'execute').resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe('Testing the getAll method', () => {
    it('it returns an array (collection) of resources', async () => {
      const response = await salesModel.getAll()
      expect(response).to.be.an('array')
      expect(response).to.have.length.above(0)
    })
  })

  describe('Testing the getById method', () => {
    it('it returns an array (collection) of resources', async () => {
      const response = await salesModel.getById(1)
      expect(response).to.be.an('array')
      expect(response).to.have.length.above(0)
    })

    // it('If no parameters are passed, an error is returned', async () => {
    //   const response = await saleModel.getById()
    //   expect(response).to.be.an('object')
    //   expect(response).to.have.property('code')
    //   expect(response).to.have.property('message')
    // })
  })

})