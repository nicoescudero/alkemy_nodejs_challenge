const userCtrl=require('../controllers/user');
const {userLogin,userRegister}=require('../validators/entries');
const {Router}=require('express');
const routes=Router();

routes.post('/login',userLogin,userCtrl.login);
routes.post('/register',userRegister,userCtrl.register);

module.exports = routes;