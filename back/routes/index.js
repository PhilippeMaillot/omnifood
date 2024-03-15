const express = require("express");
const router = express.Router();
const favController = require("../controllers/favController");
const db = require("../config/db");



router.get('/', (req, res) => {
    db.query('SELECT * FROM fav', (err, results) => {
      if (err) {
        console.error('Erreur lors de la récupération des données : ' + err.message);
        res.status(500).json({ err: 'Erreur serveur' });
        return;
      }
  
      res.status(200).json(results);
    });
  });

router.post("/add", favController.add);

router.post("/delete/:name", favController.delete);

module.exports = router;