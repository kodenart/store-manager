const { expect } = require('chai')
const sinon = require('sinon')

const salesModel = require('../../../models/salesModel')
const connection = require('../../../models/connection')

describe('Unit testing the saleModel', () => {

  before(async () => {
    const execute = [[{ a: 1, insertId: 1 }, { b: 2 }, { c: 3 }], [], []]; 

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
  })

  describe('Testing the createSaleId method', () => {
    it('it returns an array (collection) of resources', async () => {
      const response = await salesModel.createSaleId(1)
      expect(response).to.be.equal(undefined)
    })
  })

  describe('Testing the createSaleProduct method', () => {
    it('it returns an array (collection) of resources', async () => {
      const response = await salesModel.createSaleProduct(1, 2, 3)
      expect(response).to.be.an('array')
      expect(response).to.have.length.above(0)
    })
  })

  describe('Testing the deleteSales method', () => {
    it('it returns an array (collection) of resources', async () => {
      const response = await salesModel.deleteSales(1)
      expect(response).to.be.equal(0)
    })
  })

  describe('Testing the excludeSale method', () => {
    it('it returns an array (collection) of resources', async () => {
      const response = await salesModel.excludeSale(1)
      expect(response).to.be.equal(0)
    })
  })

})