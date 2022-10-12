const { expect } = require('chai');
const sinon = require('sinon');

const productModel = require('../../../src/models/product.model');

const productService = require('../../../src/services/product.service');

const serviceMock = require('./mocks/product.service.mock');

describe('Verificando service de produtos', function () {
  describe('Teste de unidade do productService', function () {
    it('Buscando todos os produtos', async function () {
      sinon.stub(productModel, 'getProducts').resolves(serviceMock.productsSucess);

      const result = await productService.getProducts();

      expect(result.code).to.deep.equal(200)
      expect(result.message).to.deep.equal(serviceMock.productsSucess);
    });

    it('Buscando apenas um produto', async function () {
      sinon.stub(productModel, 'getOneProduct').resolves(serviceMock.product);

      const id = 1;
      const result = await productService.getOneProduct(id);

      expect(result.code).to.deep.equal(200)
      expect(result.message).to.deep.equal(serviceMock.product);
    });

    it('Retorna erro quando encontra um produto com id inexistente', async function () {
      sinon.stub(productModel, 'getOneProduct').resolves(undefined);

      const id = 200;
      const result = await productService.getOneProduct(id);

      expect(result.code).to.deep.equal(404);
      expect(result.error).to.deep.equal(serviceMock.productNotFound.message);
    });
  });
  afterEach(sinon.restore);
});
