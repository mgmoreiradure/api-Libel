'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar rutas
var category_routes= require('./routes/category');
var country_routes= require('./routes/country');
var course_routes= require('./routes/course');
var gallery_routes= require('./routes/gallery');
var level_routes= require('./routes/level');
var lesson_routes= require('./routes/lesson');
var plan_routes= require('./routes/plan');
var software_routes= require('./routes/software');
var typeOfCourse_routes= require('./routes/typeOfCourse');
var user_routes= require('./routes/user');

app.use(express.static(process.cwd() + '/public'));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//configuración de cabeceras http
app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow','GET, POST, OPTIONS, PUT, DELETE');
    next();
});
// rutas base
app.use('/api', user_routes);
app.use('/api', category_routes);
app.use('/api', country_routes);
app.use('/api', level_routes);
app.use('/api', software_routes);
app.use('/api', typeOfCourse_routes);
app.use('/api', course_routes);
app.use('/api', gallery_routes);
app.use('/api', lesson_routes);
app.use('/api', plan_routes);


module.exports= app;