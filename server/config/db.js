const{Pool}=require('pg')

const pool=new Pool({
    user:"fullstack",
    password:"fathy",
    host:"localhost",
    port:5432,
    database:"fullstack_db"
})
module.exports=pool