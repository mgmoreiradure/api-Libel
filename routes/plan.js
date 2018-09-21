'use strict'

var express = require('express');
var PlanController = require('../controllers/plan');
var validate = require('express-validation');
var validation = require('./validation/course');
var md_auth = require('../middlewares/authenticated');
var variable = require('../SERVICES/variable');

var api= express.Router();
const expressJoi = require('express-joi-validator');


api.post('/add-plan', PlanController.savePlan);
api.get('/plans/:id?', PlanController.getPlan);

api.post('/upload-plan/:id',PlanController.updatePlan);

module.exports = api;