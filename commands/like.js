const fs = require('fs');

const {
    getSessions
} = require('../handlers/sessions');

module.exports = {

    name: 'like',

    async execute(sock, sender) {

        const sessions =
            getSessions();

        const partner =
            sessions[sender];

        if(!partner) {

            return sock.sendMessage(sender, {

                text:
`❌ Tidak sedang chat.`
            });
        }

        const path =
            './database/likes.json';

        const likes = JSON.parse(
            fs.readFileSync(path)
        );

        if(!likes[partner]) {
            likes[partner] = [];
        }

        likes[partner].push(sender);

        fs.writeFileSync(
            path,
            JSON.stringify(likes, null, 2)
        );

        sock.sendMessage(sender, {
            text:
`❤️ Like berhasil dikirim.`
        });

        if(
            likes[sender] &&
            likes[sender].includes(partner)
        ) {

            sock.sendMessage(sender, {

                text:
`
💖 IT'S A MATCH

Nomor Partner:
${partner.replace('@s.whatsapp.net', '')}
`
            });

            sock.sendMessage(partner, {

                text:
`
💖 IT'S A MATCH

Nomor Partner:
${sender.replace('@s.whatsapp.net', '')}
`
            });
        }
    }
};