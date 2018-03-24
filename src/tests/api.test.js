const ProductController = require('../controllers/ProductController/functions');

it('fetchProductFromDB with asin', async () => {
    try {
        const product = await ProductController.fetchProductFromDB('B00PDMJ7VS')
        expect(product.length).toBe(1);
    } catch (error) {
        console.log(error)
        expect('fetchProductFromDB').toBe(1);
    }

  });

  it('fetchProductFromDB without asin', async () => {
    try {
        const product = await ProductController.fetchProductFromDB('')
        expect(product.length).toBe(0);
    } catch (error) {
        console.log(error)
        expect('fetchProductFromDB').toBe(1);
    }

  });

  it('fetchProductFromAmazon without asin', async () => {
    try {
        const product = await ProductController.fetchProductFromAmazon('B00PDMJ7VS')
        expect(product.length).toBe(1);
    } catch (error) {
        console.log(error)
        expect('fetchProductFromAmazon').toBe(1);
    }

  });