module.exports=(sequelize,DataTypes)=>{
    return sequelize.define('User',{
        id:{
            primaryKey:true,
            type: DataTypes.INTEGER,
            autoIncrement:true
        },
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING
    });
};