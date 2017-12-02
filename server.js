'use strict';
require('dotenv').load();

var express = require('express');
var bodyParser = require('body-parser');
var app = express();


var MongoClient = require('mongodb').MongoClient;
var mongo = require('mongodb-bluebird');

var db, test_db, prod_db;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
 
// mongo.connect('mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@ds121192.mlab.com:21192/heroku_q6lkjqhb').then(function(database){

mongo.connect('mongodb://heroku_q6lkjqhb:1g3gogthbor56d5kfp2t3lig43@ds121192.mlab.com:21192/heroku_q6lkjqhb').then(function(database){

 db = database;
 //'beantest'

 // Collections
 prod_db = db.collection('waitlist'); //TODO: change this to real database after test
  // Start Server
  app.listen(process.env.PORT || 8080, function() {
    console.log('Server: Running on port 8080');
  });

}, function(err) {
  console.log(err);
});

app.post('/signup', function (req, res, next) {
  console.log('req: ', req.body);
  let request = req.body,
      data = request.data,
      timeStamp = new Date();
  
  request["time"] = timeStamp.toUTCString();
  prod_db.insert({'data': request})

  res.send('Got a POST request. Data sent to mlab collection');
  return res('success!')
})

app.get('/test', function (req, res) {

  console.log('message!!');
  res.send('Successful request!!');
  return res('error')
})
