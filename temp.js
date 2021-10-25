require('dotenv').config();

const { db, closeDB } = require('./tools/DB/db');


db.query('select NOW() as now;')
.then( (err, result) => {
    console.log(err ? err : result);
})
.catch(err => {
    console.log("CATCH: ");
    console.log(err);
});

(async () => await closeDB())();
