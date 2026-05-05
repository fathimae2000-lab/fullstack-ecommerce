const addProducts='insert into carts(user_id,product_id,quantity) values($1,$2,1) returning *'

module.exports={
    addProducts
}