'use strict'
var Plan = require('../models/plan');


function getPlan(req, res){
    var planlId = req.params.id;
    if(!planId){
        var find = Plan.find({active: true}).sort('name');
    }else{
        var find= Plan.findOne({id: planId});
    }  
    find.exec((err, plans)=>{
        if(err){
            res.status(500).send({message: 'Error en al obtener planes'});
        }else{
            if(!plans){
                res.status(404).send({message: 'No se encontraron planes'});
            }else{
                if(plans.length > 0){
                    res.status(200).send({plans: plans});
                }else{
                    res.status(404).send({message: 'No se encontraron planes'});
                }
                
            }
        }        
    });   
}
function savePlan(req, res){
     var plan = new Plan();
    var params = req.body;
    
    plan.name= params.name;    
    plan.description= params.description;
    plan.numberOfDays= params.numberOfDays;
    plan.price= params.price;    
    plan.courses=params.courses;
    plan.active= false;

    if(params.name != null){
        plan.save((err, planStored)=>{
            if(err){                        
                        res.status(500).send({message: 'Error al guardar el plan'});
                    }else{                        
                       if(!planStored){                           
                        res.status(404).send({message: 'No se ha registrado el plan'});
                       } else{
                        res.status(200).send({plan: planStored});
                       }
                    }
        });
    } else{
        res.status(200).send({message: 'Rellena todos los campos'});    
    }                            
}
function updatePlan(req, res){
    var planId= req.params.id;
    var update = req.body;

    Plan.findByIdAndUpdate(planId,update,(err,planUpdate)=>{
        if(err){
            res.status(500).send({message:'Error al actualizar  el plan'});
        }  else{
            if(!planUpdate){
                res.status(404).send({message:'No se ha podido actualizar el plan'});
            }else{
                res.status(200).send({plan:planUpdate});
            }
        }
    });
}
    
module.exports= {
    getPlan,
    savePlan,
    updatePlan
};