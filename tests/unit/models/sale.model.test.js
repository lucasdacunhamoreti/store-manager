const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const saleModel = require('../../../src/models/saleModel');

const { saleDB, bodySale } = require('./mocks/sale.model.mock');


describe('Verificando model de vendas', function () {
  describe('Teste de unidade do saleModel', function () {
    it('Cadastrando produtos com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);

      const result = await saleModel.registerSale(bodySale);

      expect(result).to.be.deep.equal(saleDB);
    });
  });
  afterEach(sinon.restore);
});
