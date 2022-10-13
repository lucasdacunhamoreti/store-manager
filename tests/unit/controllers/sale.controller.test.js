const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const saleService = require('../../../src/services/sale.service');
const saleController = require('../../../src/controllers/sale.controller');
const { bodySuccess, controllerSuccess } = require('./mocks/sale.controller.mock');

describe('Verificando controller de vendas', function () {
  describe('Teste de unidade do saleController', function () {
    it('Cadastrando uma venda com sucesso', async function () {
      const req = {
        body: bodySuccess
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(saleService, 'registerSale')
        .resolves({ code: 201, message: controllerSuccess });

      await saleController.registerSale(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(controllerSuccess);
    });

     it('Cadastrando uma venda com erro', async function () {
      const req = {
        body: bodySuccess
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(saleService, 'registerSale')
        .resolves({ code: 404, error: 'Product not found' });

      await saleController.registerSale(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });
  afterEach(sinon.restore);
});
