const express=require('express');
const morgan=require('morgan');
const helmet=require('helmet');
require('dotenv').config();
const {connect}=require('./database');
const {asociactions}=require('./models');
const app=express();

//database
connect();
asociactions();

//settings
app.set('port',process.env.PORT || 3000);
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//routes
app.use('/',require('./routes/routes.index'));

app.listen(app.get('port'),()=>console.log('listening on port: ',app.get('port')));