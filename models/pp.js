module.exports=(sequelize,DataTypes,Peliculas,Personajes)=>{
    return sequelize.define('PersonajesMovies',{
        PersonajeId:{
            type:DataTypes.INTEGER,
            primaryKey:true,
        },
        PeliculaId:{
            type:DataTypes.INTEGER,
            primaryKey:true,
        }
    });
}