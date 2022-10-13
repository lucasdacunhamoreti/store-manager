const registerSuccess = {
	id: 3,
	itemsSold: [
		{
			productId: 1,
			quantity: 1
		},
		{
			productId: 2,
			quantity: 5
		}
	]
}

const bodyService = [
		{
			productId: 1,
			quantity: 1
		},
		{
			productId: 2,
			quantity: 5
		}
]

// Sem a chave productId
const bodyWithError = [
		{
			quantity: 1
		},
		{
			productId: 2,
			quantity: 5
		}
]

const bodyWithoutIdExistent = [
  {
      productId: 100,
			quantity: 1
		},
		{
			productId: 2,
			quantity: 5
		}
]

const productNotFound = {
  code: 404,
  error: 'Product not found'
}

const serviceError = {
  code: 400,
  error: '"productId" is required'
}

const serviceSuccess = {
  code: 201,
  message: registerSuccess,
}

const allSales = [
  {
    saleId: 1,
    date: "2022-10-13T18:05:36.000Z",
    productId: 1,
    quantity: 5
  },
  {
    saleId: 1,
    date: "2022-10-13T18:05:36.000Z",
    productId: 2,
    quantity: 10
  },
  {
    saleId: 2,
    date: "2022-10-13T18:05:36.000Z",
    productId: 3,
    quantity: 15
  }
]

const saleId = [
  {
    date: "2022-10-13T18:05:36.000Z",
    productId: 1,
    quantity: 5
  },
  {
    date: "2022-10-13T18:05:36.000Z",
    productId: 2,
    quantity: 10
  }
]

module.exports = { registerSuccess, bodyService, serviceSuccess, bodyWithError, serviceError, bodyWithoutIdExistent, productNotFound, allSales, saleId };
