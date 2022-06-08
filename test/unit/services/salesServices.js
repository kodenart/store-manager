const salesService = require('../../../services/salesService')
const salesModel = require('../../../models/salesModel')
const productsModel = require('../../../models/productsModel')

const sinon = require('sinon')
const { expect } = require('chai')

describe('Unit testing product services', () => {
  const resolveAll = [{id: 1}, {id: 1}, {id: 2}]
  const resolveById = [{id: 1}, {id: 1}]
  const resolveProductById = {quantity: 10}
  

  describe('tests the getAll method', async () => {

    before(() => {
      sinon.stub(salesModel, 'getAll').resolves(resolveAll)
    })

    after(() => {
      salesModel.getAll.restore()
    })

    it('returns a collection of resources', async () => {
      const response = await salesService.getAll()
      expect(response).to.be.an('array')
    })
  })

  describe('tests the getById method', async () => {

    before(() => {
      sinon.stub(salesModel, 'getById').resolves(resolveById)
    })

    after(() => {
      salesModel.getById.restore()
    })

    it('returns a collection of resources', async () => {
      const response = await salesService.getById(1)
      expect(response).to.be.an('array')
    })
  })

  describe('tests the validateQuantity method', async () => {

    before(() => {
      sinon.stub(productsModel, 'getById').resolves(resolveProductById)
    })

    after(() => {
      productsModel.getById.restore()
    })

    it('returns 0', async () => {
      const response = await salesService.validateQuantity({ productId: 2, quantity: (resolveProductById.quantity - 1)})
      expect(response).to.be.equal(0)
    })

    it('returns an obj', async () => {
      const response = await salesService.validateQuantity({ productId: 2, quantity: (resolveProductById.quantity + 1)})
      expect(response).to.be.an('object')
    })
  })
})