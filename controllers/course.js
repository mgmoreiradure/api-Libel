'use strict'
var fs = require('fs');
var path = require('path');
var mongoosePaginate = require('mongoose-pagination');
var Course = require('../models/course');
var Software = require('../models/software');


function saveCourse(req, res){
    var course = new Course();
    var params = req.body;
    console.log(params);
    course.title= params.title;
    course.description= params.description;    
    course.type= params.type;
    course.categories= JSON.parse(params.categories);
    course.level= params.level;
    course.software= JSON.parse(params.software);                                           
    course.active=false;
    course.promotion= false;
            
    course.save((err, courseStored)=>{
        if(err){            
            res.status(500).send({message: 'Error al guardar el curso'});
        }else{            
            if(!courseStored){                
                res.status(404).send({message: 'No se ha registrado el curso'});
            } else{
                res.status(200).send({course: courseStored});
            }
        }
    });        
}
function updateCourse(req, res){
    var courseId= req.params.id;
    var update = req.body;

    Course.findByIdAndUpdate(courseId,update,(err,courseUpdate)=>{
        if(err){
            res.status(500).send({message:'Error al actualizar  el curso'});
        }  else{
            if(!courseUpdate){
                res.status(404).send({message:'No se ha podido actualizar el curso'});
            }else{
                res.status(200).send({course:courseUpdate});
            }
        }
    });
}
function uploadImagePrincipal(req, res){
    var courseId= req.params.id;
    var file_name = 'No subido...';

    if(req.files){
        var file_path = req.files.image.path;
        var file_split= file_path.split('\\');
        var file_name= file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext= ext_split[1].toLowerCase();
        if(file_ext =='png' || file_ext =='jpg'||file_ext =='gif' ){
            Course.findByIdAndUpdate(courseId, {imagePrincipal: file_name},(err,courseUpdate)=>{
                 if(err){
                        res.status(500).send({message:'Error al actualizar  el curso'});
                    }  else{
                        if(!courseUpdate){
                            res.status(404).send({message:'No se ha podido actualizar el curso'});
                        }else{
                            res.status(200).send({course: courseUpdate});
                        }
                    }
            });
        }  else{
            res.status(200).send({message:'La extencion del archivo no es valido'});
        }        
    }else{
        res.status(200).send({message: 'No ha subido ninguna imagen ...'});
    }
}
function uploadImageSmall(req, res){
    var courseId= req.params.id;
    var file_name = 'No subido...';

    if(req.files){
        var file_path = req.files.image.path;
        var file_split= file_path.split('\\');
        var file_name= file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext= ext_split[1].toLowerCase();
        if(file_ext =='png' || file_ext =='jpg'||file_ext =='gif' ){
            Course.findByIdAndUpdate(courseId, {imageSmall: file_name},(err,courseUpdate)=>{
                 if(err){
                        res.status(500).send({message:'Error al actualizar  el curso'});
                    }  else{
                        if(!courseUpdate){
                            res.status(404).send({message:'No se ha podido actualizar el curso'});
                        }else{
                            res.status(200).send({course: courseUpdate});
                        }
                    }
            });
        }  else{
            res.status(200).send({message:'La extencion del archivo no es valido'});
        }        
    }else{
        res.status(200).send({message: 'No ha subido ninguna imagen ...'});
    }
}
function getCourses(req, res){
    var page = req.params.page;
    var itemsPerPage=6;
    // {Software:'5b97ccccd8afb83e685e8c7d'}
    // Course.find({software: { _id: '5b97cd3ad8afb83e685e8c83' }}).populate('categories').populate('level').populate('type').populate('software').sort('createdAt').paginate(page, itemsPerPage ,(err, coursesStored, total)=>{
    Course.find().populate('categories').populate('level').populate('type').populate('software').sort('createdAt').paginate(page, itemsPerPage ,(err, coursesStored, total)=>{
        if (err) {
            console.log(err);
             res.status(500).send({message:'Error al actualizar  el curso'});
        }else{
            if (coursesStored.length <=0){
                res.status(200).send({message: 'No se encuentran cursos'});
            }else{
                res.status(200).send({courses: coursesStored, total: total});
            }               
        }
    }); 
}
// function getHome(req, res){
//     var page = req.params.page;
//     var itemsPerPage=6;

//     // Course.find({software: { _id: '5b97cd3ad8afb83e685e8c83' }}).populate('categories').populate('level').populate('type').populate('software').sort('createdAt').paginate(page, itemsPerPage ,(err, coursesStored, total)=>{
//     Course.find().populate('categories').populate('level').populate('type').populate('software').sort('createdAt').paginate(page, itemsPerPage ,(err, coursesStored, total)=>{
//         if (err) {
//              res.status(500).send({message:'Error al actualizar  el curso'});
//         }else{
//             if (coursesStored.length <=0){
//                 res.status(200).send({message: 'No se encuentran cursos'});
//             }else{
//                 res.status(200).send({courses: coursesStored, total: total});
//             }               
//         }
//     }); 
// }



module.exports= {   
    saveCourse,    
    updateCourse,
    uploadImagePrincipal,
    uploadImageSmall,
    getCourses
};