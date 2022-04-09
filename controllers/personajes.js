const controller={};
const {Peliculas,Personajes,PersonajesMovies}=require('../models');

controller.createCharacter=async(req,res)=>{
    const {nombre,edad,peso,historia,pelicula_id}=req.body;
    const imagen=req.file;
    const characterFound=await Personajes.findOne({where:{nombre:nombre}});
    if(characterFound)return res.status(400).json({message:'Este personaje ya existe'});
    try {
        let personaje;
        (imagen)?
        personaje=await Personajes.create({nombre: nombre,edad: edad,peso: peso,imagen: imagen.path,historia: historia}):
        personaje=await Personajes.create({nombre: nombre,edad: edad,peso: peso,historia: historia});
        if(pelicula_id){
            const movie=await Peliculas.findOne({where:{id: pelicula_id}});
            if(movie){
                await personaje.addPeliculas(movie);
                return res.json(personaje);
            }
            else return res.json({personaje,message:'Pelicula no encontrada, agrega el id de pelicula despues'});
        }
        else return res.json({personaje,message:'Agrega el id de pelicula despues'});
    } 
    catch (error) {
        return res.status(400).json('Ocurrio algun error');    
    }   
}

controller.addMovie=async(req,res)=>{
    const {personaje_id,pelicula_id}=req.body;
    const personaje=await Personajes.findOne({where:{id:personaje_id}});
    if(!personaje)return res.status(404).json({message:'Personaje no encontrado'});
    const pelicula=await Peliculas.findOne({where:{id:pelicula_id}});
    if(!pelicula)return res.status(404).json({message:'Pelicula no encontrada'});
    await personaje.addPeliculas(pelicula);
    return res.json({message:'Pelicula agregada'});
}

controller.updateCharacter=async(req,res)=>{
    const {nombre,edad,peso,historia}=req.body;
    const imagen=req.file;
    try {
        await Personajes.update({nombre: nombre,edad: edad,peso: peso,historia: historia,imagen: imagen.path},{where: {id: req.params.id}});
        const character=await Personajes.findOne({where: {id: req.params.id}});
        if(character)return res.json({message:'Personaje acutalizado',character});
        return res.status(404).json({message:'Personaje no encontrado'});
    } catch (error) {
        console.error(error);
        return res.status(400).json({message:'Some error'});
    }
}

controller.deleteCharacter=async(req,res)=>{
    const character=await Personajes.destroy({where:{id:req.params.id}});
    if(!character)return res.status(404).json({message:'Personaje no encontrado'});
    else{
        const movieRelationShip=await PersonajesMovies.destroy({where:{PersonajeId:req.params.id}});
        if(!movieRelationShip)
        return res.json({message:'Personaje eliminado'});
        return res.json({message:'Personaje eliminadon, y relacion con pelicula'});
    }
}

controller.characterList=async(req,res)=>{
    const characters=await Personajes.findAll({
        attributes:['imagen','nombre']
    });
    if(characters)return res.json(characters);
    return res.status(404).json({message:'Aun no hay personajes guardados'});
}

controller.searchCharacter=async(req,res)=>{
    const {name,age,movies}=req.query;
    if(!age && !name && !movies){
        const characters=await Personajes.findAll({
            include:{
                model: Peliculas
            }
        });
        return res.json(characters);
    }else{
        let personaje;
        if(age)personaje=await Personajes.findAll({where: {edad: age},include:{model: Peliculas}});
        if(name)personaje=await Personajes.findAll({where: {nombre: name},include:{model: Peliculas}});
        if(movies)personaje=await Peliculas.findOne({where: {id: movies},include:{model: Personajes}});
        if(personaje == '')return res.status(404).json({message:'Personaje no encontrado'});
        else {return res.json(personaje);};
    }
}

module.exports=controller;