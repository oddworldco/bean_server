'use strict';
require('dotenv').load();

var express = require('express');
var bodyParser = require('body-parser');
var app = express();


var MongoClient = require('mongodb').MongoClient;
var mongo = require('mongodb-bluebird');

var db, fertility_data, test_db, prod_db, bbt_db, lh_db;

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
 //'beantest'

 // Collections
 prod_db = db.collection('trial_11_2017_start'); //TODO: change this to real database after test
 test_db = db.collection('beantest');
 bbt_db = db.collection('bbt_data_trial_11_2017');
 lh_db = db.collection('lh_data_trial_11_2017');
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

  prod_db.insert({'uuid': request.uuid, 'timeStamp': timeStamp, 'data': data})
  res.send('Got a POST request. Data sent to mlab collection');
})

app.post('/web_test', function (req, res, next) {
  console.log('req: ', req.body);
  let request = req.body,
        data = request.data,
        timeStamp = request.timeStamp,
        uuid = request.uuid;

  test_db.insert({'uuid': request.uuid, 'timeStamp': timeStamp, 'data': data})
  res.send('Got a POST request. Data sent to mlab collection');
})

app.post('/ios_data', function (req, res, next) {
  console.log('req: ', req.body);
  let request = req.body,
      data = request.data,
      timeStamp = request.timeStamp,
      uuid = request.uuid;
      timeStamp = new Date();
  
  request["time"] = timeStamp.toUTCString();
  prod_db.insert({'data': request})

  res.send('Got a POST request. Data sent to mlab collection');
})

app.post('/ios_test', function (req, res, next) {
  console.log('req: ', req.body);
  let request = req.body,
        data = request.data,
        timeStamp = request.timeStamp,
        uuid = request.uuid;
        timeStamp = new Date();

  request["time"] = timeStamp.toUTCString();
  //‘YYYY-MM-DD HH:MI:SS ZONE’
  test_db.insert({'data': request})

  res.send('Got a POST request. Data sent to mlab collection');
})

app.post('/bbt_data', function (req, res, next) {
  console.log('req: ', req.body);
  let request = req.body,
      data = request.data,
      timeStamp = new Date();
  
  request["time"] = timeStamp.toUTCString();
  bbt_db.insert({'data': request})

  res.send('Got a POST request. Data sent to mlab collection');
})

app.post('/lh_data', function (req, res, next) {
  console.log('req: ', req.body);
  let request = req.body,
      data = request.data,
      timeStamp = new Date();
  
  request["time"] = timeStamp.toUTCString();
  lh_db.insert({'data': request})

  res.send('Got a POST request. Data sent to mlab collection');
})



app.get('/test', function (req, res) {

  console.log('message!!');
  res.send('Successful request!!');
})
