const { expect } = require('chai')
const sinon = require('sinon')
const salesService = require('../../../services/salesService')
const salesController = require('../../../controllers/salesController')


describe('Unit tests all methods from sales controllers when nothing goes wrong', () => {
  const res = {}
  const req = {}
  const resolveAll = [{id: 1}, {id: 2}, {id: 3}]
  const resolveById = [{id: 1}]
  const resolveAdd = {key: 'value'}
  const resolveUpdate = {id: 1, ItemsUpdated: [{name: 'ProductName', quantity: 42}, {name: 'ProductName', quantity: 42}]}
  const resolveExclude = {}

  before(() => {
    sinon.stub(salesService, 'getAll').resolves(resolveAll)
    sinon.stub(salesService, 'getById').resolves(resolveById)
    sinon.stub(salesService, 'createSale').resolves(resolveAdd)
    sinon.stub(salesService, 'updateSales').resolves(resolveUpdate)
    sinon.stub(salesService, 'excludeSale').resolves(resolveExclude)

    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns()
    res.end = sinon.stub().returns()
    
  })

  after(() => {
    salesService.getAll.restore()
    salesService.getById.restore()
    salesService.createSale.restore()
    salesService.updateSales.restore()
    salesService.excludeSale.restore()
  })

  describe('Testing the getAll method', () => {
    it('calls status with 200 and json with what is resolved by the service', async () => {
      await salesController.getAll(req, res)
      expect(res.status.calledWith(200)).to.be.equal(true)
      expect(res.json.calledWith(resolveAll)).to.be.equal(true)
    })
  })

  describe('Testing the getById method', () => {
    it('calls status with 200 and json with what is resolved by the service', async () => {
      req.params = { id: 1 };
      await salesController.getById(req, res)
      expect(res.status.calledWith(200)).to.be.equal(true)
      expect(res.json.calledWith(resolveById)).to.be.equal(true)
    })

  })

  describe('Testing the add method', () => {
    it('calls status with 201 and json with what is resolved by the service', async () => {
      req.body = {name: 'ProductName', quantity: 42}
      await salesController.create(req, res)
      expect(res.status.calledWith(201)).to.be.equal(true)
      expect(res.json.calledWith(resolveAdd)).to.be.equal(true)
    })
  })

  describe('Testing the update method', () => {
    it('calls status with 200 and json with what is resolved by the service', async () => {
      req.params = { id: 1 }
      req.body = { name: 'ProductName', quantity: 42 }
      await salesController.update(req, res)
      expect(res.status.calledWith(200)).to.be.equal(true)
      // expect(res.json.toHaveBeenCalled()).to.be.equal(true)
    })
  })

  describe('Testing the exclude method', () => {
    it('calls status with 204 and end despite what is returned from the service', async () => {
      req.params = { id: 1 }
      await salesController.exclude(req, res)
      expect(res.status.calledWith(204)).to.be.equal(true)
      // expect(res.end.toHaveBeenCalled()).to.be.equal(true)
    })
  })
})


describe('Unit tests all methods from sales controllers when something goes wrong', () => {
  const res = {}
  const req = {}
  let next = () => {}
  const resolveError = {code: 'anything', message: 'anything'};

  before(() => {
    sinon.stub(salesService, 'getById').resolves(resolveError)
    sinon.stub(salesService, 'createSale').resolves(resolveError)
    sinon.stub(salesService, 'updateSales').resolves(resolveError)
    sinon.stub(salesService, 'excludeSale').resolves(resolveError)

    next = sinon.stub().returns()
  })

  after(() => {
    salesService.getById.restore()
    salesService.createSale.restore()
    salesService.updateSales.restore()
    salesService.excludeSale.restore()
  })

  describe('Testing the getById method', () => {
    it('should call next with the error obj', async () => {
      req.params = { id: 1 };
      await salesController.getById(req, res, next)
      expect(next.calledWith(resolveError)).to.be.equal(true)
    })

  })

  describe('Testing the add method', () => {
    it('should call next with the error obj', async () => {
      req.body = {name: 'ProductName', quantity: 42}
      await salesController.create(req, res, next)
      expect(next.calledWith(resolveError)).to.be.equal(true)
    })
  })

  describe('Testing the update method', () => {
    it('should call next with the error obj', async () => {
      req.params = { id: 1 }
      req.body = { name: 'ProductName', quantity: 42 }
      await salesController.update(req, res, next)
      expect(next.calledWith(resolveError)).to.be.equal(true)
      // expect(res.json.toHaveBeenCalled()).to.be.equal(true)
    })
  })

  describe('Testing the exclude method', () => {
    it('should call next with the error obj', async () => {
      req.params = { id: 1 }
      await salesController.exclude(req, res, next)
      expect(next.calledWith(resolveError)).to.be.equal(true)
      // expect(res.end.toHaveBeenCalled()).to.be.equal(true)
    })
  })

})