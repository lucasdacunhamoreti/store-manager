const { expect } = require('chai');
const sinon = require('sinon');

const saleModel = require('../../../src/models/saleModel');

const saleService = require('../../../src/services/sale.service');

const { registerSuccess, bodyService, serviceSuccess, bodyWithError, serviceError, bodyWithoutIdExistent, productNotFound, allSales, saleId } = require('./mocks/sale.service.mock');

describe('Verificando service de vendas', function () {
  describe('Teste de unidade do saleService', function () {
    it('Cadastro de produtos com sucesso', async function () {
      sinon.stub(saleModel, 'registerSale').resolves(registerSuccess);

      const result = await saleService.registerSale(bodyService);

      expect(result).to.deep.equal(serviceSuccess);
    });

    it('Cadastro de produtos com falha', async function () {
      const result = await saleService.registerSale(bodyWithError);

      expect(result).to.deep.equal(serviceError);
    });

    it('Cadastro de produtos com falha sem id existente', async function () {
      const result = await saleService.registerSale(bodyWithoutIdExistent);

      expect(result).to.deep.equal(productNotFound);
    });

    it('Exibe todas as vendas com sucesso', async function () {
      sinon.stub(saleModel, 'getSales').resolves(allSales);
      const result = await saleService.getSales();

      expect(result).to.deep.equal({ code:200, message: allSales });
    });

    it('Exibe vendas por id com sucesso', async function () {
      sinon.stub(saleModel, 'getOneSale').resolves(saleId);
      const result = await saleService.getOneSale(1);

      expect(result).to.deep.equal({ code:200, message: saleId });
    });

    it('Retorna erro ao busca vendas que não existe', async function () {
      sinon.stub(saleModel, 'getOneSale').resolves([]);
      const result = await saleService.getOneSale(100);

      expect(result).to.deep.equal({ code:404, error: 'Sale not found' });
    });
  });
  afterEach(sinon.restore);
});
