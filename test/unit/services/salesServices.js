
const saleService = require('../../../services/saleService')
const saleModel = require('../../../models/saleModel')

const sinon = require('sinon')
const { expect } = require('chai')

describe('Unit testing product services', () => {
  const idParam = 1;
  
  before(() => {
    const execute = [{id: 1}, {id: 1}, {id: 2}]
    sinon.stub(saleModel, 'getAll').resolves(execute)
    sinon.stub(saleModel, 'getById').resolves(execute.filter((e) => e.id = idParam))
  })

  after(() => {
    saleModel.getAll.restore()
    saleModel.getById.restore()
  })

  describe('tests the getAll method', async () => {
    it('returns a collection of resources', async () => {
      const response = await saleService.getAll()
      expect(response).to.be.an('array')
    })
  })

  describe('tests the getById method', async () => {
    it('returns a collection of resources', async () => {
      const response = await saleService.getById(idParam)
      expect(response).to.be.an('array')
    })
  })
})