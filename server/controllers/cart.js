const cartRepositories=require('../repositories/cart')
const asyncHandler=require('express-async-handler')


const addProducts=asyncHandler(async(req,res,next)=>{

     const userId = req.userId;  

    const{product_id}=req.body

    const result=await cartRepositories.addProducts(userId,product_id)

    res.json({
        success:true,
        message:"Added to cart",
        data:result
    })

})


module.exports={
    addProducts
}

