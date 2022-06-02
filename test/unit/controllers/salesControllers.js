const { expect } = require('chai')
const sinon = require('sinon')
const salesService = require('../../../services/salesService')
const salesController = require('../../../controllers/salesController')


describe('Unit tests getAll and getById sale controllers', () => {
  const idParam = 1
  const res = {}
  const req = {}
  const getAllResolve = [{id: 1}, {id: 1}, {id: 2}]
  const getByIdResolve = getAllResolve.filter((e) => e.id === idParam)

  before(() => {
    sinon.stub(salesService, 'getAll').resolves(getAllResolve)
    sinon.stub(salesService, 'getById').resolves(getByIdResolve)

    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns()
    
  })

  after(() => {
    salesService.getAll.restore()
    salesService.getById.restore()
  })

  describe('Testing the getAll method', () => {
    it('it returns an array (collection) of resources', async () => {
      await salesController.getAll(req, res)
      expect(res.status.calledWith(200)).to.be.equal(true)
      expect(res.json.calledWith(getAllResolve)).to.be.equal(true)
    })
  })

  describe('Testing the getById method', () => {
    it('it returns an array (collection) of resources', async () => {
      req.params = { id: 1 };
      await salesController.getById(req, res)
      expect(res.status.calledWith(200)).to.be.equal(true)
      expect(res.json.calledWith(getByIdResolve)).to.be.equal(true)
    })

})
})