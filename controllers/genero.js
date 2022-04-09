const {Genero}=require('../models');
const controller={};

controller.createGenero=async(req,res)=>{
    try {
        const {nombre}=req.body;
        const imagen=req.file;
        console.log(`Archivos recibidos ${nombre} ${imagen.path}`)
        const generoExist=await Genero.findOne({where:{nombre:nombre}});
        if(generoExist)return res.status(400).json({message:'Este genero existe'});
        const genero=await Genero.create({nombre:nombre,imagen:imagen.path});
        return res.json(genero);
        
    } catch (error) {
        console.error(error);
        return res.status(400).json({message: 'some error'});
    }
}

controller.deleteGenero=(req,res)=>{
    
}

module.exports=controller;