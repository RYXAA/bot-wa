const {
    getSessions,
    saveSessions
} = require('../handlers/sessions');

const waitingUsers = [];

module.exports = {

    name: 'start',

    async execute(sock, sender) {

        const sessions =
            getSessions();

        if(sessions[sender]) {

            return sock.sendMessage(sender, {

                text:
`❌ Kamu masih dalam chat.`
            });
        }

        const partner =
            waitingUsers.find(
                x => x !== sender
            );

        if(partner) {

            waitingUsers.splice(
                waitingUsers.indexOf(partner),
                1
            );

            sessions[sender] = partner;
            sessions[partner] = sender;

            saveSessions(sessions);

            sock.sendMessage(sender, {
                text:
`💘 Partner ditemukan!`
            });

            sock.sendMessage(partner, {
                text:
`💘 Partner ditemukan!`
            });

        } else {

            waitingUsers.push(sender);

            sock.sendMessage(sender, {

                text:
`🔎 Menunggu partner...`
            });
        }
    }
};