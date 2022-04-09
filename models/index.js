const {sequelize}=require('../database');
const {DataTypes}=require('@sequelize/core');
const personajesModel=require('./personajes');
const peliculaModel=require('./peliculas');
const generoModel=require('./genero');
const userModel=require('./user');
const PersonajesMoviesModel=require('./pp');

const Genero=generoModel(sequelize,DataTypes);
const Peliculas=peliculaModel(sequelize,DataTypes);
const Personajes=personajesModel(sequelize,DataTypes);
const User=userModel(sequelize,DataTypes);
const PersonajesMovies=PersonajesMoviesModel(sequelize,DataTypes,Peliculas,Personajes);

async function asociactions(){
    await Genero.hasMany(Peliculas,{foreignKey:'genero_id'});
    await Peliculas.belongsTo(Genero,{foreignKey:'genero_id'});

    await Peliculas.belongsToMany(Personajes,{through:'PersonajesMovies'});
    await Personajes.belongsToMany(Peliculas,{through:'PersonajesMovies'});
}

module.exports={asociactions,User,Genero,Personajes,Peliculas,PersonajesMovies};