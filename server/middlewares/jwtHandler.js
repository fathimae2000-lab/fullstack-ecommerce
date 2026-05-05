const { getRolesById } = require("../repositories/users")
const { verifyToken } = require("../utlis/jwtHelper")

const verifyTokenHandler = async (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  // 🔥 remove Bearer
  const token = authHeader.split(" ")[1];

  try {
    const decoded = await verifyToken(token);

    req.userId = decoded.userId;

    next();

  } catch (err) {
    return res.status(401).json({ message: "invalid token" });
  }
};
const verifyRole=(roles)=>{
    return async (req,res,next)=>{
        const userId=res.userId
        const userRoles=await getRolesById(userId)

        const hasRole=userRoles.some(userRoles =>roles.includes(userRoles.name))

        if(hasRole){
            next()
        }else{
            return res.status(403).json({message:"you don;t have permission"})
        }
    }
}



module.exports={
    verifyRole,
    verifyTokenHandler
}
