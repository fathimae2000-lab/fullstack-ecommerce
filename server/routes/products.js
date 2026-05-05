const express=require('express')
const router=express.Router()

const{getProductById,createProduct, getProducts}=require('../controllers/products')

router.route('/').get(getProducts).post(createProduct)
router.route('/:id').get(getProductById)

module.exports=router

