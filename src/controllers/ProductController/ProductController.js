const {
    fetchProductFromAmazon,
    storeProductDB,
    fetchProductFromDB
} = require('./functions')

const ProductController = async(req, res) => {
    const asin = req.params.asin || false;
    let new_product={};
    if (!asin) 
        return res.status(404).json({err: "not found!"})
    try {
        const stored_product = await fetchProductFromDB(asin)
        if(stored_product.length > 0)new_product = stored_product[0];
        else{
            const amazon_query = await fetchProductFromAmazon(asin)

             new_product = {
                asin: amazon_query[0].ASIN[0],
                title: amazon_query[0].ItemAttributes[0].Title[0],
                price: amazon_query[0].Offers[0].Offer[0].OfferListing[0].Price[0].FormattedPrice[0],
                low_price: amazon_query[0].OfferSummary[0].LowestNewPrice[0].FormattedPrice[0],
                content: amazon_query[0].ItemAttributes[0].Title[0],
                feature: amazon_query[0].ItemAttributes[0].Feature,
                large_image: amazon_query[0].LargeImage[0].URL[0],
                images: amazon_query[0]
                    .ImageSets[0]
                    .ImageSet
                    .map(i => {
                        return {thumbnailImage: i.ThumbnailImage[0].URL[0], largeImage: i.LargeImage[0].URL[0]}
                    })
            }
             await storeProductDB(new_product)
        }
        return res
            .status(200)
            .json(new_product)
    } catch (error) {
        res
            .status(404)
            .json({err: "not found!"})
    }
}

module.exports = ProductController;