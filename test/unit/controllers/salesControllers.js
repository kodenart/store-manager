const { expect } = require('chai')
const sinon = require('sinon')
const saleService = require('../../../services/saleService')
const saleController = require('../../../controllers/saleController')


describe('Unit tests getAll and getById sale controllers', () => {
  const idParam = 1
  const res = {}
  const req = {}
  const getAllResolve = [{id: 1}, {id: 1}, {id: 2}]
  const getByIdResolve = getAllResolve.filter((e) => e.id === idParam)

  before(() => {
    sinon.stub(saleService, 'getAll').resolves(getAllResolve)
    sinon.stub(saleService, 'getById').resolves(getByIdResolve)

    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns()
    
  })

  after(() => {
    saleService.getAll.restore()
    saleService.getById.restore()
  })

  describe('Testing the getAll method', () => {
    it('it returns an array (collection) of resources', async () => {
      await saleController.getAll(req, res)
      expect(res.status.calledWith(200)).to.be.equal(true)
      expect(res.json.calledWith(getAllResolve)).to.be.equal(true)
    })
  })

  describe('Testing the getById method', () => {
    it('it returns an array (collection) of resources', async () => {
      req.params = { id: 1 };
      await saleController.getById(req, res)
      expect(res.status.calledWith(200)).to.be.equal(true)
      expect(res.json.calledWith(getByIdResolve)).to.be.equal(true)
    })

})
})