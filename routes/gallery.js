'use strict'

var express = require('express');
var GalleryController = require('../controllers/gallery');
var validate = require('express-validation');
var validation = require('./validation/user');
var md_auth = require('../middlewares/authenticated');
var variable = require('../SERVICES/variable')
var multipart = require('connect-multiparty');
// var md_upload= multipart({uploadDir: './uploads/users'});
var md_upload= multipart({uploadDir: variable.IMAGEN_GALLERY});
var api= express.Router();

const expressJoi = require('express-joi-validator');

api.post('/add-gallery', GalleryController.saveGallery);
api.get('/gallery-by-course/:courseId?',GalleryController.getGalleryByCourse);
api.post('/upload-gallery/:id',GalleryController.updateGallery);
api.post('/upload-image-gallery/:id',[md_auth.ensureAuth, md_upload],GalleryController.uploadImage);
api.get('/get-image-gallery/:imageFile',GalleryController.getImageFile);

module.exports = api;