'use strict';
require('dotenv').load();

var express = require('express');
var bodyParser = require('body-parser');
var app = express();


var MongoClient = require('mongodb').MongoClient;
var mongo = require('mongodb-bluebird');

var collection = 'smartypants_trial1';
var db, fertility_data, test_db, collection;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
 
// 'mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@ds019746.mlab.com:19746/heroku_8d8nzwb1'
mongo.connect('mongodb://heroku_1gsdf4dv:99kfcmdds2utedjvtbdkrvuj92@ds151702.mlab.com:51702/heroku_1gsdf4dv').then(function(database){

 db = database;
 collection = 'smartypants_trial1'
 //'beantest'

 // Collections
 test_db = db.collection(collection); //TODO: change this to real database after test
  // Start Server
  app.listen(process.env.PORT || 3000, function() {
    console.log('Server: Running on port 3000');
  });

}, function(err) {
  console.log(err);
});

app.post('/collect_data', function (req, res, next) {
  console.log('req: ', req.body);
  let request = req.body,
        data = request.data,
        timeStamp = request.timeStamp,
        uuid = request.uuid;

  // test_db.update({ 'uuid': uuid }, {'$push': {'data': {'timeStamp': timeStamp, 'temp': temp}}})
  test_db.insert({'data': request})

  res.send('Got a POST request. Data sent to mlab collection '+collection);
})

app.get('/test', function (req, res) {

  console.log('message!!');
  res.send('Successful request!!');
})
