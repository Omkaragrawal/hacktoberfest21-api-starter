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
      return res.status(404).send({
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

router.delete('/:id', validationSchemas.getContestantViaId, validationSchemas.globalValidator, async (req, res) => {
  try {
    const { rows, rowCount } = await database.deleteContestant(req.params.id);
    if(rowCount === 0) {
      return res.status(404).send({
        status: "error",
        message: "Contestant not found"
      });
    } else if(rowCount !== 1) {
      throw new Error("Error deleting the row:\n" + JSON.stringify({rows, rowCount}));
    }
    res.send({status: "ok"});
} catch(err) {
  res.status(500).send({
    status: "Error",
    message: err
  });
}

});


router.patch('/:id/upvote', validationSchemas.getContestantViaId, validationSchemas.globalValidator, async (req, res) => {
  try {
    const { rows, rowCount } = await database.upVoteContestant(req.params.id);
    if(rowCount === 0) {
      return res.status(404).send({
        status: "error",
        message: "Contestant not found"
      });
    } else if(rowCount !== 1) {
      throw new Error("Error upvoting the contestant:\n" + JSON.stringify({rows, rowCount}));
    }
    res.send({
      status: "ok",
      votes: rows[0].votes
    });
} catch(err) {
  res.status(500).send({
    status: "Error",
    message: err
  });
}
});
router.patch('/:id', validationSchemas.patchContestantId, validationSchemas.globalValidator, async(req, res) => {
  try {
  const { name, costumeTitle, costumeImgUrl, city, country } = req.body;
  if(!name && !costumeTitle && !costumeImgUrl && !city && !country){
    return res.status(400).send({
      status: "error",
      message: "Please submit at least one field to be updated"
    });
  }
  const { rows, rowCount } = await database.updateContestant({id: req.params.id, name, costumeTitle, costumeImgUrl, city, country});
  if(rowCount === 0) {
    return res.status(404).send({
      status: "error",
      message: "Contestant not found"
    });
  } else if(rowCount !== 1) {
    throw new Error("Error updating the contestant:\n" + JSON.stringify({rows, rowCount}));
  }
  res.send({
    status: "ok",
    contestantDetails: rows[0]
  });
} catch(err) {
res.status(500).send({
  status: "Error",
  message: err
});
}
});

module.exports = router;
