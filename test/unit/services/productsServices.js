const productsService = require('../../../services/productsService')
const productsModel = require('../../../models/productsModel')

const sinon = require('sinon')
const { expect } = require('chai')

describe('Unit testing product services', () => {
  const resolveAll = [{id: 1}, {id: 2}, {id: 3}]
  const resolveById = {id: 1}
  const resolveAdd = 4
  const resolveUpdate = 1
  const resolveExclude = 0
  const resolveNameExists = [{name: 'Teleporter'}, {name: 'Toilet Paper'}]



  describe('tests the getAll method', async () => {
    before(() => {
      sinon.stub(productsModel, 'getAll').resolves(resolveAll)
    })

    after(() => {
      productsModel.getAll.restore()
    })

    it('returns a collection of resources', async () => {
      const response = await productsService.getAll()
      expect(response).to.be.an('array')
    })
  })

  describe('tests the getById method', async () => {
    before(() => {
      sinon.stub(productsModel, 'getById').resolves(resolveById)
    })

    after(() => {
      productsModel.getById.restore()
    })

    it('returns a resource', async () => {
      const response = await productsService.getById(1)
      expect(response).to.be.an('object')
    })
  })

  describe('tests the add method', async () => {
    before(() => {
      sinon.stub(productsModel, 'add').resolves(resolveAdd)
      sinon.stub(productsModel, 'getAll').resolves([])
    })

    after(() => {
      productsModel.add.restore()
      productsModel.getAll.restore()
    })

    it('returns a resource', async () => {
      const response = await productsService.add('ProductName', 10)
      expect(response).to.be.an('object')
    })
  })

  describe('tests the update method', async () => {
    before(() => {
      sinon.stub(productsModel, 'update').resolves(resolveUpdate)
      sinon.stub(productsModel, 'getById').resolves([])
    })

    after(() => {
      productsModel.update.restore()
      productsModel.getById.restore()
    })

    it('returns a resource', async () => {
      const response = await productsService.update(2, 'ProductName', 10)
      expect(response).to.be.equal(1);
    })
  })

  describe('tests the exclude method', async () => {
      before(() => {
        sinon.stub(productsModel, 'exclude').resolves(resolveExclude)
        sinon.stub(productsModel, 'getById').resolves([])
      })

      after(() => {
        productsModel.exclude.restore()
        productsModel.getById.restore()
      })

      it('returns a resource', async () => {
        const response = await productsService.exclude(2)
        expect(response).to.be.equal(0);
      })
    })

  describe('tests the add method when name already exists', async () => {
      before(() => {
        sinon.stub(productsModel, 'getAll').resolves(resolveNameExists)
      })

      after(() => {
        productsModel.getAll.restore()
      })

      it('returns a resource', async () => {
        const response = await productsService.add('Teleporter', 42)
        expect(response).to.be.an('object');
      })
    })
})
