require('dotenv').config();

// const { db, closeDB } = require('./tools/DB/db');
// const { getParticipant, closeDB } = require('./tools/DB/db');
// const {
//     enterNewParticipant,
// } = require('./tools/DB/db');

// const {
//     upVoteContestant
// } = require('./tools/DB/db');

const {
    closeDB
} = require('./tools/DB/db');


// db.query('select NOW() as now;')
// .then( (err, result) => {
//     console.log(err ? err : result);
// })
// .catch(err => {
//     console.log("CATCH: ");
//     console.log(err);
// });

(async () => {
    // const { rows } = await getParticipant();

    // console.log(rows);
    // await rows;

    // const user = {
    //     id: "qwerty",
    //     name: "Abhinav Asthana",
    //     costumeTitle: "Astronaut",
    //     costumeImgUrl: "https://images.unsplash.com/photo-1581822261290-991b38693d1b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80",
    //     city: "San Francisco",
    //     country: "USA",
    //     votes: 12
    // };
    // const user = {
    //     id: "asdfgh",
    //     name: "Ankit Sobti",
    //     costumeTitle: "Ghost",
    //     costumeImgUrl: "https://images.unsplash.com/photo-1604013527955-f310df076541?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=757&q=80",
    //     city: "San Francisco",
    //     country: "USA",
    //     votes: 1
    // };
    // const user = {
    //     id: "zxcvbn",
    //     name: "Abhijit Kane",
    //     costumeTitle: "Pumpkin Zombie",
    //     costumeImgUrl: "https://images.unsplash.com/photo-1540427969750-1424f2fa0af8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=764&q=80",
    //     city: "Delhi",
    //     country: "India",
    //     votes: 25
    // };
    // const {
    //     rows
    // } = await enterNewParticipant(user);
    // const {
        // rows
    // } = await upVoteContestant("qwerty");

    // console.log(rows);

    // await closeDB();

    const id = require('./tools/idGenerator');

    console.log(id.getRandomUserId());
})();

// (async () => await closeDB())();