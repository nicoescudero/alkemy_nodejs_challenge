module.exports=(sequelize,DataTypes)=>{
    return sequelize.define('Genero',{
        id:{
            primaryKey:true,
            type: DataTypes.INTEGER,
            autoIncrement:true
        },
        nombre:{
            type: DataTypes.STRING,
            unique: true
        },
        imagen: DataTypes.STRING,
    },{timestamps:false});
};