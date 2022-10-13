const saleDB = {
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

const bodySale = [
  {
    productId: 1,
    quantity: 1
  },
  {
    productId: 2,
    quantity: 5
  }
]

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

module.exports = { saleDB, bodySale, allSales, saleId };
