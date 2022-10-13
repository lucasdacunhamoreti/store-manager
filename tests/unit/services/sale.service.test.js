const { expect } = require('chai');
const sinon = require('sinon');

const saleModel = require('../../../src/models/saleModel');

const saleService = require('../../../src/services/sale.service');

const { registerSuccess, bodyService, serviceSuccess, bodyWithError, serviceError, bodyWithoutIdExistent, productNotFound } = require('./mocks/sale.service.mock');

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
  });
  afterEach(sinon.restore);
});
