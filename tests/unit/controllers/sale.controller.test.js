const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const saleService = require('../../../src/services/sale.service');
const saleController = require('../../../src/controllers/sale.controller');
const { bodySuccess, controllerSuccess, allSales, oneSale } = require('./mocks/sale.controller.mock');

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

    it('Exibe todas as vendas com sucesso', async function () {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(saleService, 'getSales')
        .resolves({ code: 200, message: allSales });

      await saleController.getSales(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allSales);
    });

    it('Exibe uma busca de vendas por id com sucesso', async function () {
      const req = { params: { id: 1 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(saleService, 'getOneSale')
        .resolves({ code: 200, message: oneSale });

      await saleController.getOneSale(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(oneSale);
    });

    it('Exibe erro ao buscar vendas por id que não existe', async function () {
      const req = { params: { id: 100 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(saleService, 'getOneSale')
        .resolves({ code: 404, message: 'Sale not found' });

      await saleController.getOneSale(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith('Sale not found');
    });
  });
  afterEach(sinon.restore);
});
