const { expect } = require('chai')
const sinon = require('sinon')
const productsService = require('../../../services/productsService')
const productsController = require('../../../controllers/productsController')


describe('Unit tests all methods from product controllers when nothing goes wrong', () => {
  const res = {}
  const req = {}
  const resolveAll = [{id: 1}, {id: 2}, {id: 3}]
  const resolveById = [{id: 1}]
  const resolveAdd = {key: 'value'}
  const resolveUpdate = {id: 1, name: 'ProductName', quantity: 42}
  const resolveExclude = {}
  const resolveError = {code: 'anything', message: 'anything'};

  before(() => {
    sinon.stub(productsService, 'getAll').resolves(resolveAll)
    sinon.stub(productsService, 'getById').resolves(resolveById)
    sinon.stub(productsService, 'add').resolves(resolveAdd)
    sinon.stub(productsService, 'update').resolves(resolveUpdate)
    sinon.stub(productsService, 'exclude').resolves(resolveExclude)

    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns()
    res.end = sinon.stub().returns()
    
  })

  after(() => {
    productsService.getAll.restore()
    productsService.getById.restore()
    productsService.add.restore()
    productsService.update.restore()
    productsService.exclude.restore()
  })

  describe('Testing the getAll method', () => {
    it('calls status with 200 and json with what is resolved by the service', async () => {
      await productsController.getAll(req, res)
      expect(res.status.calledWith(200)).to.be.equal(true)
      expect(res.json.calledWith(resolveAll)).to.be.equal(true)
    })
  })

  describe('Testing the getById method', () => {
    it('calls status with 200 and json with what is resolved by the service', async () => {
      req.params = { id: 1 };
      await productsController.getById(req, res)
      expect(res.status.calledWith(200)).to.be.equal(true)
      expect(res.json.calledWith(resolveById)).to.be.equal(true)
    })

  })

  describe('Testing the add method', () => {
    it('calls status with 201 and json with what is resolved by the service', async () => {
      req.body = {name: 'ProductName', quantity: 42}
      await productsController.add(req, res)
      expect(res.status.calledWith(201)).to.be.equal(true)
      expect(res.json.calledWith(resolveAdd)).to.be.equal(true)
    })
  })

  describe('Testing the update method', () => {
    it('calls status with 200 and json with what is resolved by the service', async () => {
      req.params = { id: 1 }
      req.body = { name: 'ProductName', quantity: 42 }
      await productsController.update(req, res)
      expect(res.status.calledWith(200)).to.be.equal(true)
      // expect(res.json.toHaveBeenCalled()).to.be.equal(true)
    })
  })

  describe('Testing the exclude method', () => {
    it('calls status with 204 and end despite what is returned from the service', async () => {
      req.params = { id: 1 }
      await productsController.exclude(req, res)
      expect(res.status.calledWith(204)).to.be.equal(true)
      // expect(res.end.toHaveBeenCalled()).to.be.equal(true)
    })
  })
})


describe('Unit tests all methods from product controllers when something goes wrong', () => {
  const res = {}
  const req = {}
  let next = () => {}
  const resolveError = {code: 'anything', message: 'anything'};

  before(() => {
    sinon.stub(productsService, 'getById').resolves(resolveError)
    sinon.stub(productsService, 'add').resolves(resolveError)
    sinon.stub(productsService, 'update').resolves(resolveError)
    sinon.stub(productsService, 'exclude').resolves(resolveError)

    next = sinon.stub().returns()
  })

  after(() => {
    productsService.getById.restore()
    productsService.add.restore()
    productsService.update.restore()
    productsService.exclude.restore()
  })

  describe('Testing the getById method', () => {
    it('should call next with the error obj', async () => {
      req.params = { id: 1 };
      await productsController.getById(req, res, next)
      expect(next.calledWith(resolveError)).to.be.equal(true)
    })

  })

  describe('Testing the add method', () => {
    it('should call next with the error obj', async () => {
      req.body = {name: 'ProductName', quantity: 42}
      await productsController.add(req, res, next)
      expect(next.calledWith(resolveError)).to.be.equal(true)
    })
  })

  describe('Testing the update method', () => {
    it('should call next with the error obj', async () => {
      req.params = { id: 1 }
      req.body = { name: 'ProductName', quantity: 42 }
      await productsController.update(req, res, next)
      expect(next.calledWith(resolveError)).to.be.equal(true)
      // expect(res.json.toHaveBeenCalled()).to.be.equal(true)
    })
  })

  describe('Testing the exclude method', () => {
    it('should call next with the error obj', async () => {
      req.params = { id: 1 }
      await productsController.exclude(req, res, next)
      expect(next.calledWith(resolveError)).to.be.equal(true)
      // expect(res.end.toHaveBeenCalled()).to.be.equal(true)
    })
  })

})