const {
    getSessions,
    saveSessions
} = require('../handlers/sessions');

module.exports = {

    name: 'stop',

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

        delete sessions[sender];
        delete sessions[partner];

        saveSessions(sessions);

        sock.sendMessage(sender, {
            text:
`✅ Chat dihentikan.`
        });

        sock.sendMessage(partner, {
            text:
`❌ Partner keluar chat.`
        });
    }
};