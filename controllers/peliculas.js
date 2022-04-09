const controller={};
const {Peliculas,Personajes,PersonajesMovies,Genero}=require('../models');

controller.createMovie=async(req,res)=>{
    try {
        const {titulo,calificacion,personaje_id,genero_id}=req.body;
        const imagen=req.file;
        console.log(`DATA: ${titulo} ${calificacion} ${personaje_id} ${genero_id}`)
        const movieFound=await Peliculas.findOne({where:{titulo: titulo}});
        if(movieFound)return res.json({message:'Esta pelicula ya existe'});

        let pelicula;
        (imagen)?
        pelicula=await Peliculas.create({titulo: titulo,calificacion: calificacion,imagen: imagen.path,genero_id: genero_id}):
        pelicula=await Peliculas.create({titulo: titulo,calificacion: calificacion,genero_id: genero_id});

        if(!personaje_id)
            return res.json({pelicula,message:'Agrega despues el personaje'});
        else{
            const personaje=await Personajes.findOne({where:{id:personaje_id}});
            if(!personaje)return res.json({pelicula,message:'Personaje no encontrado, agrega despues el personaje'});
            pelicula.addPersonajes(personaje);
            return res.json(pelicula);
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json('Some error');
    }
}

controller.addPersonajes=async(req,res)=>{
    const {personaje_id,pelicula_id}=req.body;
    const pelicula=await Peliculas.findOne({where:{id:pelicula_id}});
    if(!pelicula)return res.status(404).json({message:'Pelicula no encontrada'});
    const personaje=await Personajes.findOne({where:{id:personaje_id}});
    if(!personaje)return res.status(404).json({message:'Personaje no encontrado'});
    await pelicula.addPersonajes(personaje);
    return res.json({message:'Personaje agregado'});
}

controller.updateMovie=async(req,res)=>{
    const {titulo,calificacion,genero_id}=req.body;
    const imagen=req.file;
    try{
        let movie;
        (imagen)?
        movie=await Peliculas.update({titulo: titulo,calificacion: calificacion,genero_id: genero_id,imagen: imagen.path},{where: {id: req.params.id}})
        : movie=await Peliculas.update({titulo: titulo,calificacion: calificacion,genero_id: genero_id},{where: {id: req.params.id}});
        if(!movie) return res.status(404).json({message:'Pelicula no encontrada'});
        const movieUpdated=await Peliculas.findOne({where:{id: req.params.id}});
        return res.json(movieUpdated);
    }catch(error){
        console.error(error);
        return res.status(400).json({message:'Some error'});
    }

}

controller.deleteMovie=async(req,res)=>{
    try {
        const movie=await Peliculas.destroy({where: {id:req.params.id}});
        if(!movie)return res.status(404).json({message:'Pelicula no encontrada'});
        else{
            const characterRelationShip=await PersonajesMovies.destroy({where: {PeliculaId:req.params.id}});
            if(!characterRelationShip) return res.json({message:'Pelicula eliminada'});
            return res.json({message:'Pelicula eliminada y la relacion con personaje'});
        }
    } catch (error) {
        return res.status(400).json({message:'Some error'});
    }
}

controller.searchMovies=async(req,res)=>{
    const {name,genre,order}=req.query;
    try {
        let movies;
        if(!name && !genre && !order){
            movies=await Peliculas.findAll({attributes: ['imagen','titulo','fechaCreacion']});
            return res.json(movies);
        }else{
            if(name)movies=await Peliculas.findOne({where:{titulo: name},include: {model: Personajes}});
            if(genre)movies=await Peliculas.findAll({where: {genero_id: genre},include: {model: Personajes}});
            if(order){
                if(order=='ASC' || order=='asc')movies=await Peliculas.findAll({order:[['titulo','ASC']],include:{model:Personajes}});
                if(order=='desc' || order=='DESC')movies=await Peliculas.findAll({order:[['titulo','DESC']],include:{model:Personajes}});
            }
            if(movies !== '')return res.json(movies);
            return res.status(404).json({message:'Pelicula no encontrada'});
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:'Some error'});
    }
}

module.exports=controller;