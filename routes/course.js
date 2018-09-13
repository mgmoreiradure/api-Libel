'use strict'

var express = require('express');
var CourseController = require('../controllers/course');
var validate = require('express-validation');
var validation = require('./validation/course');
var md_auth = require('../middlewares/authenticated');
var variable = require('../SERVICES/variable');
var multipart = require('connect-multiparty');
var md_upload= multipart({uploadDir: variable.IMAGE_COURSE});
var api= express.Router();
const expressJoi = require('express-joi-validator');


api.post('/add-course', expressJoi(validation.saveValidation), CourseController.saveCourse);
api.get('/courses/:page?',  CourseController.getCourses);
// api.put('/update-user/:id',[md_auth.ensureAuth ],UserController.updateUser);
api.post('/upload-image-principal/:id',[md_upload],CourseController.uploadImagePrincipal);

module.exports = api;