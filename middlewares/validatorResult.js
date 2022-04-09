const {validationResult} =require('express-validator');

const validation=(req,res,next)=>{
    try {
    validationResult(req).throw();
    return next();   
    } catch (error) {
        return res.status(403).json(error.array());
    }
}

module.exports=validation;