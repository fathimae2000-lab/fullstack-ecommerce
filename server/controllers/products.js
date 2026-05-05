const productRepository = require('../repositories/products')
const asyncHandler = require('express-async-handler')

const getProducts= asyncHandler(async (req, res, next) => {
    const products = await productRepository.getProducts()
    res.status(200).json(products)
})

const getProductById = asyncHandler(async (req, res, next) => {
    const {id}=req.params
    const product = await productRepository.getPrdouctById(id)
    res.status(200).json(product)
})

const createProduct = asyncHandler(async (req, res, next) => {
    const { product_name, image, price, offerprice, category_id, rating } = req.body
    const newProduct = await productRepository.createProduct(
        product_name,
        image,
        price,
        offerprice,
        category_id,
        rating
    )
    res.status(200).json(newProduct)
})



module.exports={
    getProducts,
    getProductById,     
    createProduct,
    
    
}