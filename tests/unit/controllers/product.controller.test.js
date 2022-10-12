const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const productService = require('../../../src/services/product.service');
const productController = require('../../../src/controllers/product.controller');
const mockController = require('./mocks/product.controller.mock');

describe('Verificando controller de produtos', function () {
  describe('Teste de unidade do productController', function () {
    it('Buscando todos os produtos', async function () {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'getProducts')
        .resolves({ code: 200, message: mockController.AllProducts });

      await productController.getProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(mockController.AllProducts);
    });

    it('Buscando apenas um produto', async function () {
      const req = {params: { id: 1 },};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'getOneProduct')
        .resolves({ code: 200, message: mockController.AllProducts[0] });

      await productController.getOneProduct(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(mockController.AllProducts[0]);
    });

    it('Retorna erro quando encontra um produto com id inexistente', async function () {
      const req = { params: { id: 100 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'getOneProduct')
        .resolves({ code: 404, error: mockController.productNotExist.message });

      await productController.getOneProduct(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith(mockController.productNotExist);
    });

    it('Cadastra com sucesso um novo produto', async function () {
      const req = { body: { name: 'Mickey Mouse' } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'registerProduct')
        .resolves({ code: 201, message: { id: 10, name: 'Mickey Mouse' } });

      await productController.registerProduct(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith({ id: 10, name: 'Mickey Mouse' });
    });

    it('Falha ao cadastrar um novo produto com name menor que 5', async function () {
      const req = { body: { name: 'Mick' } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'registerProduct')
        .resolves({ code: 422, error: '"name" length must be at least 5 characters long' });

      await productController.registerProduct(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
    });

    it('Falha ao cadastrar um novo produto sem o campo name', async function () {
      const req = { body: { name: '' } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'registerProduct')
        .resolves({ code: 400, error: '"name" is required' });

      await productController.registerProduct(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
    });
  });
  afterEach(sinon.restore);
});
