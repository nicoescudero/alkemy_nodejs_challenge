const {body,check}=require('express-validator');
const validation=require('../middlewares/validatorResult');
const Checks={};

const userRegister=[
    body('username','Complete a username min 4 characters').exists().notEmpty().isLength({min:4}).trim().escape(),
    body('email','Enter a valid email address').exists().notEmpty().isEmail().normalizeEmail(),
    body('password','Password min 8 characters').exists().notEmpty().isLength({min:8}),
    (req,res,next)=>validation(req,res,next)
];

const userLogin=[
    body('email','Enter a valid email address').exists().notEmpty().isEmail().normalizeEmail(),
    body('password','Password min 8 characters').exists().notEmpty().isLength({min:8}),
    (req,res,next)=>validation(req,res,next)
];

const characters=[
    check('nombre','Enter a namve, min 3 characters').exists().notEmpty().trim().escape(),
    check('edad','Enter a age').exists().notEmpty(),
    check('peso','Enter a peso').exists().notEmpty(),
    check('historia','Enter history').exists().notEmpty(),
    check('imagen','Enter a image').exists().notEmpty(),
    (req,res,next)=>validation(req,res,next)
];

const movies=[
    body('titulo','Enter a title of movie').exists().notEmpty(),
    body('calificacion','Enter qualification').exists().notEmpty(),
    body('genero_id','Enter genero id').exists().notEmpty(),
    (req,res,next)=>validation(req,res,next)
];

Checks.id=[
    check('id','Enter a id in params').exists().notEmpty(),
    (req,res,next)=>validation(req,res,next)
];

Checks.idName=[
    check('name','Enter a id in params').exists().notEmpty(),
    (req,res,next)=>validation(req,res,next)
];

Checks.idAge=[
    check('age','Enter a id in params').exists().notEmpty(),
    (req,res,next)=>validation(req,res,next)
];

Checks.idMovie=[
    check('movies','Enter a id in params').exists().notEmpty(),
    (req,res,next)=>validation(req,res,next)
];

Checks.idGenre=[
    check('genre','Enter a genre').exists().notEmpty(),
    (req,res,next)=>validation(req,res,next)
];

Checks.idOrder=[
    check('order','Enter a order "ASC" or "DESC"').exists().notEmpty(),
    (req,res,next)=>validation(req,res,next)
];

module.exports={userRegister,userLogin,characters,movies,Checks};