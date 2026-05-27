const {
    findBestMatch
} = require('../handlers/matchmaking');

module.exports = {

    name: 'match',

    async execute(sock, sender) {

        const result =
            findBestMatch(sender);

        if(!result) {

            return sock.sendMessage(sender, {

                text:
`❌ Match tidak ditemukan.`
            });
        }

        const {
            user,
            score
        } = result;

        sock.sendMessage(sender, {

            text:
`
💘 AI MATCH FOUND

👤 Nama: ${user.name}
🎂 Umur: ${user.age}
📍 Lokasi: ${user.location}

🎯 Hobi:
${user.hobby.join(', ')}

💖 Compatibility:
${score}%
`
        });
    }
};