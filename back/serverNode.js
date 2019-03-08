const http = require('http');
const path = require('path');
const mySQL = require('./configMysql');
const express = require('express');
const app = express();

var cors = require('cors');
app.use(cors());

const port = 5000;
const morgan = require('morgan');
const bodyParser = require('body-parser');

const axios = require ('axios');

// Support JSON-encoded bodies
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
// Support URL-encoded bodies
app.use(bodyParser.urlencoded({
  extended: false
}));

app.get('/', (request, response) => {
  response.send('Bienvenue sur Express');
});

app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }
  console.log(`Server is listening on ${port}`);
});

// Incription formulaire
app.post("/signup", (req, res) => {
  const lastname = req.body.lastname;
  const firstname = req.body.firstname;
  const pseudo = req.body.pseudo;
  const password = req.body.password;
  const email = req.body.email;

  var sql = 'INSERT INTO les_vioks (firstname, lastname, pseudo, email, password) VALUES ('+mySQL.escape(firstname)+', '+mySQL.escape(lastname)+', '+mySQL.escape(pseudo)+', '+mySQL.escape(email)+','+mySQL.escape(password)+')';
  
  mySQL.query(sql, (err, results) => {
    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      console.log("erreur message", err.sqlMessage);
      res.status(500).send("Oups, Erreur lors de la sauvegarde");
    } else {
      // Si tout s'est bien passé, on envoie un statut "ok".
      res.sendStatus(200);
    }
  })

})

// Login
app.post("/login", (req, res) => {
  const pseudoMail = req.body.pseudoMail;
  const password = req.body.password;

  var sql = 'SELECT COUNT(*) FROM `les_vioks` WHERE pseudo = ('+mySQL.escape(pseudoMail)+') OR email = ('+mySQL.escape(pseudoMail)+')';
  
  mySQL.query(sql, (err, results) => {
    // console.log("erreur : ", err.sql);
    // console.log("password base de donnée : ", results[0].password);
    // console.log("password input : ", password);
    // console.log("base de donnée : ", results[0]);
    // console.log("erreur", err);
    // console.log("recherche resykt", JSON.stringify(results).indexOf('1') )
    
    if (JSON.stringify(results).indexOf('1') > 0){
      newSql = 'SELECT * FROM `les_vioks` WHERE pseudo = ('+mySQL.escape(pseudoMail)+') OR email = ('+mySQL.escape(pseudoMail)+')';
      mySQL.query(newSql, (err, results) => {
      if (results[0].password === password) {

        //Si tout s'est bien passé, on envoie un statut "ok".
        res.status(200).json('auth=true');
        console.log("tu es connecté");

        
        
      } else {
        // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
        res.status(200).json('auth=false');
        console.log("Erreur du mot de passe");
      }
    })
    }
      else {
        res.status(200).json('auth=false');
        console.log("Erreur du pseudo ou du mail");
      }
  })

});

// lecture bdd
app.get('/vioks/', (req, res) => {
  mySQL.query(`SELECT * from les_vioks`, (err, results) => {
    if (err) {
      console.log(err.sqlMessage);
      res.status(500).send('Erreur lors de la récupération : ' + err.sqlMessage);
    } else {
      res.json(results);
    }
  });
});
