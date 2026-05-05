const pino=require('pino')

const {randomUUID}=require('node:crypto')

const pinoLogger=require('pino-http')({
    logger:pino(),
    genReqId:function(req,res){
        const existingID=req.id ?? req.headers["x-request-id"]
        if(existingID) return existingID
        const id=randomUUID()
        res.setHeader('X-Request-id',id)
        return id
    }
})

module.exports=pinoLogger;
