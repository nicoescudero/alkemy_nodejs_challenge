const {Sequelize}=require('@sequelize/core');
const {DB_NAME,DB_USER,DB_PASSWORD}=process.env;

const sequelize= new Sequelize(DB_NAME,DB_USER,DB_PASSWORD,{
    host:'127.0.0.1',
    dialect: 'mysql'
});

const connect=async()=>{
    try {
        await sequelize.sync({alter:false});
        await sequelize.authenticate();
        console.log('CONNECT SUCCESSFULY');
    } catch (error) {
        console.error('Unable to connect to the database:',error);
    }
}

module.exports={sequelize,connect};
