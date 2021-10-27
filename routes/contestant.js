var express = require('express');
var router = express.Router();
const database = require('../tools/DB/db');

/* GET home page. */
router.get('/', async(req, res) => {
  try {
    const { rows } = await database.getParticipant();
    res.json({
      items: rows
    });
    
  } catch (error) {
    res.sendStatus(500).send({
      status: error,
      message: error.message
    });
  }
  
});

router.post('/', (req, res) => {
res.send("OK");
});

module.exports = router;
