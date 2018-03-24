require('dotenv').config()
const amazon = require('amazon-product-api');
const client = amazon.createClient({awsId: process.env.AWS_ID, awsSecret: process.env.AWS_SECRET, awsTag: process.env.AWS_TAG});
const ProductModel = require('../../db/models/Product')

const fetchProductFromDB = (asin) => {
    return new Promise((resolve, reject) => {
        ProductModel
            .find({
                asin
            }, (err, product) =>{
                if (err) 
                    reject(err);
                resolve(product);
            });
    })
}
const storeProductDB = (product) => {
    const new_product = new ProductModel(product);
    return new Promise((resolve, reject) => {
        new_product
            .save((err)=> {
                if (err) 
                    reject(err);
                resolve('saved');
            });
    })
}
const fetchProductFromAmazon = (asin) => {
    return client
        .itemLookup({idType: 'ASIN', itemId: asin, responseGroup: `Images, ItemAttributes, OfferFull, Offers, PromotionSummary, SalesRank, VariationImages, Reviews, OfferSummary`})
        .catch(function (err) {
            console.log(err);
        });
}
module.exports = {
    fetchProductFromAmazon,
    storeProductDB,
    fetchProductFromDB
}