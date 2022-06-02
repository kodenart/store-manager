const salesService = require('../../../services/salesService')
const salesModel = require('../../../models/salesModel')

const sinon = require('sinon')
const { expect } = require('chai')

describe('Unit testing product services', () => {
  const idParam = 1;
  
  before(() => {
    const execute = [{id: 1}, {id: 1}, {id: 2}]
    sinon.stub(salesModel, 'getAll').resolves(execute)
    sinon.stub(salesModel, 'getById').resolves(execute.filter((e) => e.id = idParam))
  })

  after(() => {
    salesModel.getAll.restore()
    salesModel.getById.restore()
  })

  describe('tests the getAll method', async () => {
    it('returns a collection of resources', async () => {
      const response = await salesService.getAll()
      expect(response).to.be.an('array')
    })
  })

  describe('tests the getById method', async () => {
    it('returns a collection of resources', async () => {
      const response = await salesService.getById(idParam)
      expect(response).to.be.an('array')
    })
  })
})