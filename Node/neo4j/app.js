var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var neo4j = require('neo4j-driver').v1;

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', 'proyecto1'));
var session = driver.session();

app.get('/',function(req,res){
    res.send("get");
});

app.post('/create/restaurant', function (req, res) {
      var nameR=req.body.name
      session
        .run('CREATE (NameParam:Restaurant {name:{NameParam}})',{NameParam:nameR})
        .then(function(result){
            session.close;
        })
        .catch(function (err) {
            console.log(err);
        });
    res.send('it works');
});

app.post('/create/location', function (req, res) {
    var nameR=req.body.name
    session
      .run('CREATE (NameParam:Location {name:{NameParam}})',{NameParam:nameR})
      .then(function(result){
          session.close;
      })
      .catch(function (err) {
          console.log(err);
      });
  res.send('it works');
});

app.post('/relation/branch', function (req, res) {
    var nameR=req.body.namer
    var nameL=req.body.namel
    session
      .run('MATCH(Restaurante:Restaurant {name:{NameParam}}) MATCH(Locacion:Location {name:{LocParam}}) CREATE (Restaurante)-[:IS_LOCATED]->(Locacion)',{NameParam:nameR,LocParam:nameL})
      .then(function(result){
          result.records.forEach(function(records){
                console.log(records);
          });
          session.close;
      })
      .catch(function (err) {
          console.log(err);
      });
  res.send('it works');
});

app.post('/create/service', function (req, res) {
    var nameR=req.body.service
    session
      .run('CREATE (NameParam:Service {service:{NameParam}})',{NameParam:nameR})
      .then(function(result){
          session.close;
      })
      .catch(function (err) {
          console.log(err);
      });
  res.send('it works');
});

app.post('/create/schedule', function (req, res) {
    var nameR=req.body.schedule
    session
      .run('CREATE (NameParam:Schedule {schedule:{NameParam}})',{NameParam:nameR})
      .then(function(result){
          session.close;
      })
      .catch(function (err) {
          console.log(err);
      });
  res.send('it works');
});

app.post('/relation/opens', function (req, res) {
    var nameR=req.body.namer
    var nameL=req.body.open
    session
      .run('MATCH(Restaurante:Restaurant {name:{NameParam}}) MATCH(Horario:Schedule {schedule:{ScheParam}}) CREATE (Restaurante)-[:OPENS_AT]->(Horario)',{NameParam:nameR,ScheParam:nameL})
      .then(function(result){
          result.records.forEach(function(records){
                console.log(records);
          });
          session.close;
      })
      .catch(function (err) {
          console.log(err);
      });
  res.send('it works');
});

app.post('/relation/services', function (req, res) {
    var nameR=req.body.namer
    var nameL=req.body.service
    session
      .run('MATCH(Restaurante:Restaurant {name:{NameParam}}) MATCH(Servicio:Service {service:{SerParam}}) CREATE (Restaurante)-[:OFFERS]->(Servicio)',{NameParam:nameR,SerParam:nameL})
      .then(function(result){
          result.records.forEach(function(records){
                console.log(records);
          });
          session.close;
      })
      .catch(function (err) {
          console.log(err);
      });
  res.send('it works');
});

app.listen(3000);
console.log('Server Started on Port 3000');

module.exports = app;

