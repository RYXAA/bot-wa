const fs = require('fs');

module.exports = {

    name: 'profile',

    async execute(sock, sender) {

        const users = JSON.parse(
            fs.readFileSync('./database/users.json')
        );

        const user = users.find(
            x => x.id === sender
        );

        if(!user) {

            return sock.sendMessage(sender, {
                text:
`❌ Kamu belum register.`
            });
        }

        sock.sendMessage(sender, {

            text:
`
👤 PROFILE

📛 Nama: ${user.name}
🎂 Umur: ${user.age}
🚻 Gender: ${user.gender}
❤️ Interest: ${user.interest}
📍 Lokasi: ${user.location}

🎯 Hobi:
${user.hobby.join(', ')}
`
        });
    }
};