'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GallerySchema = Schema({
    title:  String,
    description: String,        
    course: {type: Schema.ObjectId, ref: 'Course'},    
    user: {type: Schema.ObjectId, ref: 'User'} ,   
    image: String,    
    createdAt: {type: Date, default: Date.now},    
});

module.exports = mongoose.model('Gallery',GallerySchema);