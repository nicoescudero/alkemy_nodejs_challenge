const bcrypt=require('bcrypt');
const controller={};
const jwt=require('jsonwebtoken');
const {User}=require('../models');
const {TOKEN_KEY}=process.env;

async function encryptPassword(password){
    const salt=await bcrypt.genSalt(10);
    const hash=await bcrypt.hash(password,salt);
    return hash;
}

controller.register=async(req,res)=>{
    const {username,email,password}=req.body;
    const userExist=await User.findOne({where:{email}});
    if(userExist)return res.status(401).json({message:'Ya existe un usuario con este email'});
    const user=await User.create({username:username,email:email,password:await encryptPassword(password)});
    const token=jwt.sign({id:user.id},TOKEN_KEY,{expiresIn: '1h'});
    return res.json(token);
}

controller.login=async(req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({where:{email}});
    if(!user)return res.status(404).json({message:'Usuario no encontrado'});
    if(await bcrypt.compare(password,user.password)){
        const token=jwt.sign({id:user.id},TOKEN_KEY,{expiresIn: '1h'});
        return res.json(token);
    }
    return res.send('Contraseña incorrecta');
}


module.exports=controller;