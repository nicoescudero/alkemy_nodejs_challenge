module.exports=(sequelize,DataTypes)=>{
    return sequelize.define('Personajes',{
        id:{
            primaryKey:true,
            type: DataTypes.INTEGER,
            autoIncrement:true
        },
        nombre: DataTypes.STRING,
        edad: DataTypes.INTEGER,
        peso: DataTypes.INTEGER,
        imagen: DataTypes.STRING,
        historia: DataTypes.STRING,
    },{
        timestamps:true
    });
};