const { expect } = require('chai')
const sinon = require('sinon')
const productService = require('../../../services/productService')
const productController = require('../../../controllers/productController')


describe('Unit tests getAll and getById product controllers', () => {
  const idParam = 1
  const res = {}
  const req = {}
  const getAllResolve = [{id: 1}, {id: 2}, {id: 3}]
  const getByIdResolve = getAllResolve.filter((e) => e.id === idParam)

  before(() => {
    sinon.stub(productService, 'getAll').resolves(getAllResolve)
    sinon.stub(productService, 'getById').resolves(getByIdResolve)

    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns()
    
  })

  after(() => {
    productService.getAll.restore()
    productService.getById.restore()
  })

  describe('Testing the getAll method', () => {
    it('calls status with 200 and json with anArrOfObj', async () => {
      await productController.getAll(req, res)
      expect(res.status.calledWith(200)).to.be.equal(true)
      expect(res.json.calledWith(getAllResolve)).to.be.equal(true)
    })
  })

  describe('Testing the getById method', () => {
    it('it returns an array (collection) of resources', async () => {
      req.params = { id: 1 };
      await productController.getById(req, res)
      expect(res.status.calledWith(200)).to.be.equal(true)
      expect(res.json.calledWith(getByIdResolve)).to.be.equal(true)
    })

})
})