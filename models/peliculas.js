module.exports=(sequelize,DataTypes)=>{
    return sequelize.define('Peliculas',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        titulo:{
            type:DataTypes.STRING,
            unique:true
        },
        fechaCreacion: {
            type:DataTypes.DATE,
            defaultValue:new Date()
        },
        calificacion: {
            type:DataTypes.INTEGER
        },
        imagen:{ 
            type:DataTypes.STRING
        },
        genero_id:{
            type:DataTypes.INTEGER
        }
    });
};