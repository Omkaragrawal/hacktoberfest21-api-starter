var express = require('express');
var router = express.Router();
const database = require('../tools/DB/db');
const validationSchemas = require('../tools/validationSchemas');

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

router.post('/', validationSchemas.postRootContestant, validationSchemas.globalValidator, async (req, res) => {
  try {
  const { rows, rowCount } = database.enterNewParticipant(req.body);
  if(rowCount !== 1) {
    throw new Error("Error entering the row:\n" + JSON.stringify({rows, rowCount}));
  }
  res.status(201).send({
    status: "ok",
    id: rows[0].id
  });

  } catch(err) {
    res.status(500).send({
      status: "Error",
      message: err
    });
  }
});

router.get('/:id', validationSchemas.getContestantViaId, validationSchemas.globalValidator, async (req, res) => {
  try {
    const { rows, rowCount } = await database.getParticipant(req.params.id);
    if(rowCount === 0) {
      res.status(404).send({
        status: "error",
        message: "Contestant not found"
      });
    } else if(rowCount !== 1) {
      throw new Error("Error retrieving the row:\n" + JSON.stringify({rows, rowCount}));
    }
    res.send(rows[0]);
} catch(err) {
  res.status(500).send({
    status: "Error",
    message: err
  });
}

});

module.exports = router;
