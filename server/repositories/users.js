const pool=require('../config/db')
const userQueries=require('..//queries/users')
const {hashPassword}=require('../utlis/passwordHelper')


const createNewUser=(username, email, password, phone)=>{
    const hashedPassword=hashPassword(password)
    return new Promise((resolve,reject)=>{
        pool.query(userQueries.createNewUser,[username,email,password,phone],(err,results)=>{
            if(err){
                reject(err)
            }else{
                const userId=results.rows ? results.rows[0].i :undefined
                resolve(userId)
            }
        })
    })
}

const getUserByUsername=(username)=>{
    return new Promise((resolve,reject)=>{
        pool.query(userQueries.getUserByUsername,[username],(err,results)=>{
            if(err){
                reject(err)
            }else{
                resolve(results.rows)
            }
        })
    })
}
const getUserByEmail=(email)=>{
    return new Promise((resolve,reject)=>{
        pool.query(userQueries.getUserByEmail,[email],(err,results)=>{
            if(err){
                reject(err)
            }else{
                resolve(results.rows)
            }
        })
    })
}

const getRolesById=(userId)=>{
    return new Promise((resolve,reject)=>{
        pool.query(userQueries.getRolesByUserId,[userId],(error,results)=>{
            if(error){
                reject(error)
            }else{
                resolve(results.rows)
            }
        })
    })
}

module.exports={
    createNewUser,
    getRolesById,
    getUserByEmail,
    getUserByUsername
}