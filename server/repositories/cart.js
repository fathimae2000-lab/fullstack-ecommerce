const cartQueries=require('../queries/cart')
const pool =require('../config/db')



const addProducts=(userId,product_id)=>{
    return new Promise((resolve,reject)=>{
        pool.query(cartQueries.addProducts,[userId,product_id],(err,results)=>{
            if(err){
                reject(err)
            }else{
                resolve(results.rows[0])
            }
        })        
    })
}


module.exports={
    addProducts
}