const pool=require('../config/db')
const productQueries=require('../queries/products')


const getProducts=()=>{
    return new Promise((resolve,reject)=>{
        pool.query(productQueries.getProducts,(err,results)=>{
            if(err){
                reject(err)
            }else{
                resolve({success:true,data:results.rows})
            }
        })
    })
}

const getPrdouctById=(id)=>{
    
    return new Promise((resolve,reject)=>{
        pool.query(productQueries.getProductById,[id],(err,results)=>{
            if(err){
                reject(err)
            }else{
                resolve({success:true,data:results.rows[0]})
            }
        })
    })
}
const createProduct=(product_name, image, price, offerprice, category_id, rating)=>{
    return new Promise((resolve,reject)=>{
        pool.query(productQueries.createProduct,[product_name, image, price, offerprice, category_id, rating],(err,result)=>{
            if(err){
                reject(err)
            }else{
                resolve({success:true,message:"Product created successfully"})
            }
        })
    })
}



module.exports={
    getProducts,
    getPrdouctById,
    createProduct,
   
}