const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const productModel = require('../../../src/models/product.model');

const { productsDB } = require('./mocks/product.model.mock');

describe('Verificando model de produtos', function () {
  describe('Teste de unidade do productModel', function () {
    it('Buscando todos os produtos', async function () {
      sinon.stub(connection, 'execute').resolves([productsDB]);

      const result = await productModel.getProducts();

      expect(result).to.equal(productsDB);
    });

    it('Buscando apenas um único produto', async function () {
      sinon.stub(connection, 'execute').resolves([[productsDB[0]]]);

      const result = await productModel.getOneProduct(1);

      expect(result).to.equal(productsDB[0]);
    });

    it('Retorna erro ao buscar um produto com id não existente', async function () {
      sinon.stub(connection, 'execute').resolves([[]]);

      const result = await productModel.getOneProduct(300);

      expect(result).to.equal(undefined);
    });

    it('Cadastrar um novo produto com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 10 }]);

      const result = await productModel.registerProduct('Mickey Mouse');

      expect(result).to.equal(10);
    });
  });
  afterEach(sinon.restore);
});
