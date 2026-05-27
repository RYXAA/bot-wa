const fs = require('fs');

function calculateScore(user, target) {

    let score = 0;

    if(user.interest === target.gender)
        score += 30;

    if(target.interest === user.gender)
        score += 30;

    if(
        user.location.toLowerCase() ===
        target.location.toLowerCase()
    ) {
        score += 15;
    }

    const ageDiff =
        Math.abs(user.age - target.age);

    if(ageDiff <= 2)
        score += 10;

    const commonHobby =
        user.hobby.filter(
            x => target.hobby.includes(x)
        );

    score += commonHobby.length * 5;

    return Math.min(score, 100);
}

function findBestMatch(sender) {

    const users = JSON.parse(
        fs.readFileSync('./database/users.json')
    );

    const me = users.find(
        x => x.id === sender
    );

    if(!me) return null;

    let bestUser = null;
    let bestScore = 0;

    for(const target of users) {

        if(target.id === sender)
            continue;

        const score =
            calculateScore(me, target);

        if(score > bestScore) {

            bestScore = score;
            bestUser = target;
        }
    }

    if(!bestUser) return null;

    return {
        user: bestUser,
        score: bestScore
    };
}

module.exports = {
    findBestMatch
};