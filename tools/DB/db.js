const pg = require('pg');


const db_config = process.env.DATABASE_URL ? 
{
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: process.env.NODE_ENV === "production" ? true: false
    },
    max: 8
} : 
{
    user: process.env.db_user,
    host: process.env.db_host,
    database: process.env.db_db,
    password: process.env.db_password,
    port: Number.isInteger(process.env.db_port) ? Number(process.env.db_port) : 5432,
    ssl: {
        rejectUnauthorized: process.env.NODE_ENV === "production" ? true: false
    },
    max: 8
};
const db = new pg.Pool(db_config);
const closeDB = () => db.end();




module.exports = {
    db,
    closeDB
};