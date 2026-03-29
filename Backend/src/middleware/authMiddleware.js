import jwt from 'jsonwebtoken'


export const authUser = (req , res , next) =>{

    const token = req.cookies.token
    
    if(! token){
        return res.status(400)
        .json({
            success : false ,
            message : 'Please login to access this resource',
            err : "token not provided"
        })
    }

    try{
        const decoded  = jwt.verify(token , process.env.JWT_SECRET)
        req.user = decoded
        next()
    }
    catch(err){
        return res.status(400)
        .json({
            success : false ,
            message : "Invalid token",
            err : 'Invalid token'
        })
    }

}