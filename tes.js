const {
    default: makeWASocket,
    useMultiFileAuthState,
    fetchLatestBaileysVersion
} = require('@whiskeysockets/baileys');

const qrcode = require('qrcode-terminal');

async function start() {

    const {
        state,
        saveCreds
    } = await useMultiFileAuthState('session');

    const {
        version
    } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({

        version,

        auth: state,

        browser: ['Windows', 'Chrome', '120']
    });

    sock.ev.on(
        'creds.update',
        saveCreds
    );

    sock.ev.on(
        'connection.update',
        ({ qr, connection }) => {

            if(qr) {

                qrcode.generate(qr, {
                    small: true
                });
            }

            if(connection === 'open') {

                console.log(
                    'BOT CONNECTED'
                );
            }
        }
    );
}

start();