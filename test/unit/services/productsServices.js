const productService = require('../../../services/productService')
const productModel = require('../../../models/productModel')

const sinon = require('sinon')
const { expect } = require('chai')

describe('Unit testing product services', () => {
  const idParam = 1;
  
  before(() => {
    const execute = [{id: 1}, {id: 2}, {id: 3}]
    sinon.stub(productModel, 'getAll').resolves(execute)
    sinon.stub(productModel, 'getById').resolves(execute[0])
  })

  after(() => {
    productModel.getAll.restore()
    productModel.getById.restore()
  })

  describe('tests the getAll method', async () => {
    it('returns a collection of resources', async () => {
      const response = await productService.getAll()
      expect(response).to.be.an('array')
    })
  })

  describe('tests the getById method', async () => {
    it('returns a resource', async () => {
      const response = await productService.getById(idParam)
      expect(response).to.be.an('object')
    })
  })
})