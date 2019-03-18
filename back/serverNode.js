const http = require('http');
const path = require('path');
const mySQL = require('./configMysql');
const express = require('express');
const app = express();

const bcrypt = require('bcrypt');
const cors = require('cors');
app.use(cors());

//TOKEN
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

const port = 5000;
const morgan = require('morgan');
const bodyParser = require('body-parser');

const axios = require('axios');

const mailAdmin1 = "jeanvernus@wild.com";


//TOKEN function
const jwtSecret = '1234';
app.use(expressJwt({
  secret: jwtSecret
}).unless({
  path: ['/login', '/signup']
}));

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
  console.log("test boody", req.body);

  const firstname = req.body.firstname;
  const pseudo = req.body.pseudo;
  const password = bcrypt.hashSync(req.body.password, 10);
  const email = req.body.email;

  var sql = 'INSERT INTO les_vioks (firstname, lastname, pseudo, email, password) VALUES (' + mySQL.escape(firstname) + ', ' + mySQL.escape(lastname) + ', ' + mySQL.escape(pseudo) + ', ' + mySQL.escape(email) + ',' + mySQL.escape(password) + ')';

  mySQL.query(sql, (err, results) => {
    console.log("results", results);
    console.log("errors", err);


    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      console.log("erreur message", err.sqlMessage);
      res.status(500).json('signupError');
    } else {
      // Si tout s'est bien passé, on envoie un statut "ok".
      res.status(200).json('signupValid');
    }
  })

})

// Login
app.post("/login", (req, res) => {
  // const passwordAdmin1 = 'SELECT password FROM `les_vioks` WHERE email = (' + mySQL.escape(mailAdmin1) + ')';

  const pseudoMail = req.body.pseudoMail;
  const password = req.body.password;

  var sql = 'SELECT COUNT(*) FROM `les_vioks` WHERE pseudo = (' + mySQL.escape(pseudoMail) + ') OR email = (' + mySQL.escape(pseudoMail) + ')';

  mySQL.query(sql, (err, results) => {

    if (JSON.stringify(results).indexOf('1') > 0) {
      const newSql = 'SELECT * FROM `les_vioks` WHERE pseudo = (' + mySQL.escape(pseudoMail) + ') OR email = (' + mySQL.escape(pseudoMail) + ')';
      mySQL.query(newSql, (err, results) => {
        if (bcrypt.compareSync(password, results[0].password)) {
          const token = jwt.sign({
            pseudoMail
          }, jwtSecret);
          res.status(200).json({
            auth : true,
            token
          });

        } 
        else {
          // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
          res.status(200).json({
            auth: false
          });
          console.log("Erreur du mot de passe");
        }
      })
    } 
    else {
      res.status(200).json({
        auth: false
      });
      console.log("Erreur du pseudo ou du mail");
    }
  })

});

// // lecture Admin
// app.post('/vioks/', (req, res) => {
//   mySQL.query(`SELECT * from les_vioks`, (err, results) => {
//     if (err) {
//       console.log(err.sqlMessage);
//       res.status(500).send('Erreur lors de la récupération : ' + err.sqlMessage);
//     } else {
//       res.json(results);
//     }
//   });
// });

// lecture User
app.post('/vioks/user', (req, res) => {
  const { pseudoMail } = req.body; // c'est un tres bon developpeur
  const myWhere = pseudoMail === mailAdmin1 ? "" : 'WHERE pseudo = (' + mySQL.escape(pseudoMail) + ') OR email = (' + mySQL.escape(pseudoMail) + ')'
  const newSql = 'SELECT * FROM `les_vioks` '+ myWhere;
  mySQL.query(newSql, (err, results) => {
    if (err) {
      console.log(err.sqlMessage);
      res.status(500).send('Erreur lors de la récupération : ' + err.sqlMessage);
    } else {
      res.json(results);
    }
  });
});