const fs = require('fs');

const path = './database/sessions.json';

function getSessions() {

    return JSON.parse(
        fs.readFileSync(path)
    );
}

function saveSessions(data) {

    fs.writeFileSync(
        path,
        JSON.stringify(data, null, 2)
    );
}

module.exports = {
    getSessions,
    saveSessions
};