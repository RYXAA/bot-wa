const {
    getSessions
} = require('./sessions');

async function relayMessage(sock, sender, text) {

    const sessions = getSessions();

    const partner = sessions[sender];

    if(!partner) return;

    await sock.sendPresenceUpdate(
        'composing',
        partner
    );

    setTimeout(async () => {

        await sock.sendMessage(partner, {
            text
        });

    }, 1000);
}

module.exports = relayMessage;