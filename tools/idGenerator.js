const { customAlphabet } = require('nanoid');
const { urlAlphabet } = require('nanoid');

const getRandomUserId = () => customAlphabet(urlAlphabet, 8);

module.exports = {
    getRandomUserId
}