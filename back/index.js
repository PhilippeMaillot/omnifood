const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./config/db');

const indexRouter = require('./routes/index.js');



// Connexion à la base de données
db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données : ' + err.message);
  } else {
    console.log('Connexion à la base de données établie');
  }
});

app.use(express.json());
app.use(cors());

// Routes de l'API
app.use('/fav',indexRouter);

app.listen(8080, () => {
  console.log('Serveur à l\'écoute  sur le port 8080');
});
