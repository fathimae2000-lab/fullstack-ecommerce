const errorHandler=(error,req,res,next)=>{
    console.error("🔥 ACTUAL SERVER ERROR:", err.stack || err); 
    res.status(error.statusCode || 500).json({
        message:error.message || "Server Error"
    })
}

module.exports=errorHandler;