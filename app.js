var express = require('express');
var path = require('path');
const bodyParser = require('body-parser')
var Amadeus = require("amadeus");
const keys = require('./config/dev');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var amadeus = new Amadeus({
  clientId: keys.clientId,
  clientSecret: keys.clientSecret
});

app.post('/amadeus-inspirational-flights', function(req, res) {
  var value = req.body;
  console.log(value.origin);
  amadeus.shopping.flightDestinations.get({
    origin: value.origin
  }).then(function (response) {
    console.log(response.data);
    res.send(response.data);
  }).catch(function (response) {
    res.send(response.data);
  });
});


module.exports = app;
