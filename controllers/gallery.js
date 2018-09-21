'use strict'
var Gallery = require('../models/gallery');
var fs = require('fs');
var path = require('path');

function getGalleryByCourse(req, res){
    var courseId = req.params.courseId;    
    var find= Gallery.find({course: courseId});    
    find.exec((err, gallery)=>{
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!gallery){
                res.status(404).send({message: 'No se encontraron imagen de galeria'});
            }else{
                if(lessons.length > 0){
                    res.status(200).send({galleries: gallery});
                }else{
                    res.status(404).send({message: 'No se encontraron imagenes de la galeria'});
                }                
            }
        }        
    });   
}
function saveGallery(req, res){
    var gallery = new Gallery();
    var params = req.body;
    
    gallery.title=params.title;
    gallery.description=params.description;
    gallery.course=params.course;
                 
    if(params.title != null && params.description!= null && params.course!= null ){
        gallery.save((err, galleryStored)=>{
            if(err){                        
                        res.status(500).send({message: 'Error al guardar la imagen a la galeria'});
                    }else{                        
                       if(!lessonStored){                           
                        res.status(404).send({message: 'No se ha guardado la imagen a la galeria'});
                       } else{
                        res.status(200).send({galleries: gallery});
                       }
                    }
        });
    } else{
        res.status(200).send({message: 'Rellena todos los campos'});    
    }                            
}

function updateGallery(req, res){
    var galleryId= req.params.id;
    var update = req.body;

    Gallery.findByIdAndUpdate(galleryId,update,(err,galleryUpdate)=>{
        if(err){
            res.status(500).send({message:'Error al actualizar modificar los datos de la imagne de la galeria'});
        }  else{
            if(!galleryUpdate){
                res.status(404).send({message:'No se ha podido actualizar la información de la imagen de la galeria'});
            }else{
                res.status(200).send({gallery:galleryUpdate});
            }
        }
    });
}
function uploadImage(req, res){
    var galleryId= req.params.id;
    var file_name = 'No subido...';
    var fileOld;
    if(req.files){
        var file_path = req.files.image.path;
        var file_split= file_path.split('\\');
        var file_name= file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext= ext_split[1].toLowerCase();
        if(file_ext =='png' || file_ext =='jpg'||file_ext =='gif' ){
            Gallery.findById(galleryId,(err,galleryOld)=>{
                if(err){
                    res.status(500).send({message:'Error al actualizar  la imagen'});
                }  else{
                    if(!galleryOld){
                        res.status(404).send({message:'No se ha podido actualizar la imagen de la galeria'});
                    }else{
                        fileOld= galleryOld.image;        
                        Gallery.findByIdAndUpdate(galleryId, {image: file_name},(err,galleryUpdate)=>{
                             if(err){
                                    res.status(500).send({message:'Error al actualizar  la galleria'});
                                }  else{
                                    if(!galleryUpdate){
                                        res.status(404).send({message:'No se ha podido actualizar la galeria'});
                                    }else{
                                        fs.exists('./uploads/gallery/'+ fileOld, function(exists){
                                            if(exists){
                                                fs.unlink('./uploads/gallery/'+ fileOld, function(err, result) {
                                                    if (!err){
                                                        res.status(200).send({gallery:galleryUpdate});
                                                    }
                                                  });
                                            }else{
                                                res.status(200).send({user:userUpdate});
                                            }
                                        });
                                    }
                                }
                        });
                    }
                }
            });
        }  else{
            res.status(200).send({message:'La extencion del archivo no es valido'});
        }
        console.log(file_path);
    }else{
        res.status(200).send({message: 'No ha subido ninguna imagen ...'});
    }
}
function getImageFile(req,res){
    var imageFile = req.params.imageFile;
    var path_file = './uploads/gallery/'+ imageFile;
    
    fs.exists(path_file, function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(200).send({message: 'No existe la imagen'});
        }
    });
}    
module.exports= {
    getGalleryByCourse,
    saveGallery,
    uploadImage,
    getImageFile,
    updateGallery
};