const { expect } = require('chai')
const sinon = require('sinon')

const productsModel = require('../../../models/productsModel')
const connection = require('../../../models/connection')

describe('Unit testing the productModel', () => {


  describe('Testing the getAll method', () => {

    before(async () => {
      const execute = [[{ a: 1 }, { b: 2 }, { c: 3 }], [], []]; 

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('it returns an array (collection) of resources', async () => {
      const response = await productsModel.getAll()
      expect(response).to.be.an('array')
      expect(response).to.have.length.above(0)
    })
  })

  describe('Testing the getById method', () => {
    
    before(async () => {
      const execute = [[{ id: 1, name: 'Item N1', quantity: 10 }], [], []]; 

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('it returns a resource', async () => {
      const response = await productsModel.getById(1)
      expect(response).to.be.an('object')
      expect(response).to.have.property('id')
      expect(response).to.have.property('name')
      expect(response).to.have.property('quantity')
    })
  })

})