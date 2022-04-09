const {Router}=require('express');
const routes=Router();

const configUpload=require('../middlewares/multer');
const {Checks}=require('../validators/entries');

const movieCtrl=require('../controllers/peliculas');
const generoCtrl=require('../controllers/genero');

//Peliculas
routes.get('/movies',movieCtrl.searchMovies)

routes.post('/movie/create',configUpload,movieCtrl.createMovie)
routes.post('/movie/addCharacter',movieCtrl.addPersonajes);

routes.put('/movie/update/:id',configUpload,Checks.id,movieCtrl.updateMovie)
routes.delete('/movie/delete/:id',Checks.id,movieCtrl.deleteMovie)

//Genero
routes.post('/genero/create',configUpload,generoCtrl.createGenero);

module.exports= routes;