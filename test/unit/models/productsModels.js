const { expect } = require('chai')
const sinon = require('sinon')

const productsModel = require('../../../models/productsModel')
const connection = require('../../../models/connection')

describe('Unit testing the productModel', () => {


  describe('Testing the getAll method', () => {

    before(async () => {
      const execute = [[{ a: 1 }, { b: 2 }, { c: 3 }], [], []]; 

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('it returns an array (collection) of resources', async () => {
      const response = await productsModel.getAll()
      expect(response).to.be.an('array')
      expect(response).to.have.length.above(0)
    })
  })

  describe('Testing the getById method', () => {
    
    before(async () => {
      const execute = [[{ id: 1, name: 'Item N1', quantity: 10 }], [], []]; 

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('it returns a resource', async () => {
      const response = await productsModel.getById(1)
      expect(response).to.be.an('object')
      expect(response).to.have.property('id')
      expect(response).to.have.property('name')
      expect(response).to.have.property('quantity')
    })
  })

})



describe('Unit testing the rest of productModel', () => {
  describe('Testing the add method', () => {
  before(async () => {
    const execute = [{ insertId: 1 }, [], []]; 

    sinon.stub(connection, 'execute').resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });
    it('returns an insertId', async () => {
      const response = await productsModel.add('Idk', 5)
      expect(response).to.be.equal(1)
    })
  })

  describe('Testing the update method', () => {
  before(async () => {
    const execute = [{ affectedRows: 1 }, [], []]; 

    sinon.stub(connection, 'execute').resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });
    it('returns an insertId', async () => {
      const response = await productsModel.update(1, 'Idk', 5)
      expect(response).to.be.equal(1)
    })
  })

  describe('Testing the exclude method', () => {
  before(async () => {
    const execute = [{}, [], []]; 

    sinon.stub(connection, 'execute').resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });
    it('returns an insertId', async () => {
      const response = await productsModel.exclude(3)
      expect(response).to.be.equal(0)
    })
  })

  describe('Testing the updateQnt method', () => {
  before(async () => {
    const execute = ['zzz', [], []]; 

    sinon.stub(connection, 'execute').resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });
    it('returns an insertId', async () => {
      const response = await productsModel.updateQnt({productId: 2, quantity: 5}, 'add')
      expect(response).to.be.equal('zzz')
    })
  })

})