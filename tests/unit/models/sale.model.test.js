const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const saleModel = require('../../../src/models/saleModel');

const { saleDB, bodySale, allSales, saleId } = require('./mocks/sale.model.mock');


describe('Verificando model de vendas', function () {
  describe('Teste de unidade do saleModel', function () {
    it('Cadastrando produtos com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);

      const result = await saleModel.registerSale(bodySale);

      expect(result).to.be.deep.equal(saleDB);
    });

    it('Retorna todos os produtos com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves([allSales]);

      const result = await saleModel.getSales();

      expect(result).to.be.deep.equal(allSales);
    });

    it('Retorna vendas com sucesso buscando por id', async function () {
      sinon.stub(connection, 'execute').resolves([saleId]);

      const result = await saleModel.getOneSale(1);

      expect(result).to.be.deep.equal(saleId);
    });
  });
  afterEach(sinon.restore);
});
