const {Router}=require('express');
const routes=Router();
const characteCtrl=require('../controllers/personajes');
const {Checks}=require('../validators/entries');
const configUpload=require('../middlewares/multer');

routes.post('/character/create',configUpload,characteCtrl.createCharacter);
routes.post('/character/addMovie',characteCtrl.addMovie);

routes.put('/character/update/:id',configUpload,Checks.id,characteCtrl.updateCharacter);
routes.delete('/character/delete/:id',Checks.id,characteCtrl.deleteCharacter);

routes.get('/characters',characteCtrl.searchCharacter);

module.exports= routes;