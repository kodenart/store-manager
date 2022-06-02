const productsService = require('../../../services/productsService')
const productsModel = require('../../../models/productsModel')

const sinon = require('sinon')
const { expect } = require('chai')

describe('Unit testing product services', () => {
  const idParam = 1;
  
  before(() => {
    const execute = [{id: 1}, {id: 2}, {id: 3}]
    sinon.stub(productsModel, 'getAll').resolves(execute)
    sinon.stub(productsModel, 'getById').resolves(execute[0])
  })

  after(() => {
    productsModel.getAll.restore()
    productsModel.getById.restore()
  })

  describe('tests the getAll method', async () => {
    it('returns a collection of resources', async () => {
      const response = await productsService.getAll()
      expect(response).to.be.an('array')
    })
  })

  describe('tests the getById method', async () => {
    it('returns a resource', async () => {
      const response = await productsService.getById(idParam)
      expect(response).to.be.an('object')
    })
  })
})