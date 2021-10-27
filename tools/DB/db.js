const pg = require('pg');
const {
    getRandomUserId
} = require('../idGenerator');
const queries = require('./queries');

const db_config = process.env.DATABASE_URL ? {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
    max: 8
} : {
    user: process.env.db_user,
    host: process.env.db_host,
    database: process.env.db_db,
    password: process.env.db_password,
    port: Number.isInteger(process.env.db_port) ? Number(process.env.db_port) : 5432,
    ssl: {
        rejectUnauthorized: process.env.NODE_ENV === "production" ? true : false
    },
    max: 8
};
const db = new pg.Pool(db_config);
const closeDB = () => db.end();
const createTable = () => db.query(queries.createTable);

const getParticipant = (id = "all") => {
    if (id === "all") return db.query(queries.getAllContestants);
    else if (id) return db.query(queries.getSelectContestant, [id]);
    return Promise.reject("Invalid Request");
};

const enterNewParticipant = ({
    name,
    costumeTitle,
    costumeImgUrl,
    city = "Mumbai",
    country = "India",
    votes = 0,
    id = getRandomUserId()
}) => {
    if (!name || !costumeTitle || !costumeImgUrl) return Promise.reject("Invalid Parameters");
    return db.query(queries.enterNewParticipant, [id, name, costumeTitle, costumeImgUrl, city, country, votes]);
};

const upVoteContestant = async id => {
    if (!!!id) return Promise.reject("Invalid ID");
    return db.query(queries.upVoteContestant, [id]);
};

const deleteContestant = async id => {
    if (!!!id) return Promise.reject("Invalid ID");
    return db.query(queries.deleteContestant, [id]);
};

const updateContestant = async ({id, name, costumeTitle, costumeImgUrl, city, country}) => {
    let params = [id];
    let constructedQuery = queries.UpdateContestant.queryStart;
    let counter = 1;
    if(name) {
        counter += 1;
        constructedQuery += queries.UpdateContestant.name + `$${counter},`;
        params.push(name);
    }
    if(costumeTitle) {
        counter += 1;
        constructedQuery += queries.UpdateContestant.costumeTitle + `$${counter},`;
        params.push(costumeTitle);
    }
    if(costumeImgUrl) {
        counter += 1;
        constructedQuery += queries.UpdateContestant.costumeImgUrl + `$${counter},`;
        params.push(costumeImgUrl);
    }
    if(city) {
        counter += 1;
        constructedQuery += queries.UpdateContestant.city + `$${counter},`;
        params.push(city);
    }
    if(country) {
        counter += 1;
        constructedQuery += queries.UpdateContestant.country + `$${counter}`;
        params.push(country);
    }
    if(constructedQuery.endsWith(",")) {
        constructedQuery = constructedQuery.substring(0, constructedQuery.length - 1);
    }
    return db.query(constructedQuery + queries.UpdateContestant.queryEnd, params);
};

const initializeDatabase = async () => {
    try {
        await createTable();
        const user = {
            id: "qwerty",
            name: "Abhinav Asthana",
            costumeTitle: "Astronaut",
            costumeImgUrl: "https://images.unsplash.com/photo-1581822261290-991b38693d1b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80",
            city: "San Francisco",
            country: "USA",
            votes: 12
        };
        const user1 = {
            id: "asdfgh",
            name: "Ankit Sobti",
            costumeTitle: "Ghost",
            costumeImgUrl: "https://images.unsplash.com/photo-1604013527955-f310df076541?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=757&q=80",
            city: "San Francisco",
            country: "USA",
            votes: 1
        };
        const user2 = {
            id: "zxcvbn",
            name: "Abhijit Kane",
            costumeTitle: "Pumpkin Zombie",
            costumeImgUrl: "https://images.unsplash.com/photo-1540427969750-1424f2fa0af8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=764&q=80",
            city: "Delhi",
            country: "India",
            votes: 25
        };
        let {
            rowCount,
            rows
        } = await enterNewParticipant(user);
        if (rowCount !== 1) {
            return Promise.reject(JSON.stringify({
                rowCount,
                rows
            }));
        } else {
            let {
                rowCount1,
                rows1
            } = await enterNewParticipant(user1);
            if (rowCount1 !== 1) {
                return Promise.reject(JSON.stringify({
                    rowCount1,
                    rows1
                }));
            } else {
                let {
                    rowCount2,
                    rows2
                } = await enterNewParticipant(user2);
                if (rowCount2 !== 1) {
                    return Promise.reject(JSON.stringify({
                        rowCount2,
                        rows2
                    }));
                }
            }
        }

    } catch (error) {
        return Promise.reject(error);
    }
};

module.exports = {
    db,
    closeDB,
    createTable,
    initializeDatabase,
    getParticipant,
    enterNewParticipant,
    updateContestant,
    deleteContestant,
    upVoteContestant
};