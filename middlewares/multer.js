const multer=require('multer');
const path=require('path');

const storage=multer.diskStorage({
    destination:path.join(__dirname,'/public'),
    filename:(req,file,cb)=>{
        cb(null,file.fieldname);
    }
})

const configUpload=multer({
    storage,
    dest:path.join(__dirname,'/public'),
    limits:{fileSize:20000000},
    fileFilter:(req,file,cb)=>{
        const types=/png|jpg|jpeg/;
        const mimetype=types.test(file.mimetype);
        const extname=types.test(path.extname(file.originalname));
        if(mimetype && extname)return cb(null,true);
        return cb('Error: el archivo debe ser una imagen');
    }
}).single('imagen');

module.exports=configUpload;