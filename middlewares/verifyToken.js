const jwt=require('jsonwebtoken');

module.exports=async(req,res,next)=>{
    try {
    const token=req.headers.authorization.split(' ')[1];
    const user=jwt.verify(token,process.env.TOKEN_KEY);
    if(user)next();
    else return res.status(403).send('Invalid Token');   
    } catch (error) {
        return res.status(403).json({message:'You need a token!'});   
    }
}