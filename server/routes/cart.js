const express=require('express')
const router=express.Router()

const{addProducts}=require('../controllers/cart')
const {verifyTokenHandler}=require('../middlewares/jwtHandler')



router.post('/add',verifyTokenHandler,addProducts)


module.exports=router
