const {Router}=require('express');
const routes=Router();
const verifyToken=require('../middlewares/verifyToken');

routes.use('/auth',require('./auth'));
routes.use('/',verifyToken,require('./routes.peliculas'));
routes.use('/',verifyToken,require('./routes.personajes'));

module.exports = routes;