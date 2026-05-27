const {
    default: makeWASocket,
    useMultiFileAuthState,
    fetchLatestBaileysVersion
} = require('@whiskeysockets/baileys');

const qrcode = require('qrcode-terminal');

const P = require('pino');

const path = require('path');

const fs = require('fs');

async function startBot() {

    const {
        state,
        saveCreds
    } = await useMultiFileAuthState(
        'session'
    );

    const {
        version
    } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({

        version,

        auth: state,

        logger: P({
            level: 'silent'
        }),

        printQRInTerminal: false,

        browser: [
            'Windows',
            'Chrome',
            '120'
        ]
    });

    const commands = new Map();

    const commandFiles = fs
        .readdirSync(
            path.join(__dirname, 'commands')
        );

    for(const file of commandFiles) {

        const command =
            require(`./commands/${file}`);

        commands.set(
            command.name,
            command
        );
    }

    // SAVE SESSION
    sock.ev.on(
        'creds.update',
        saveCreds
    );

 sock.ev.on(
    'messages.upsert',
    async (m) => {

        try {

            const msg =
                m.messages[0];

            if(!msg.message)
                return;

            if(
                msg.key.remoteJid ===
                'status@broadcast'
            ) return;

            const from =
                msg.key.remoteJid;

            const body =
                msg.message.conversation ||

                msg.message.extendedTextMessage?.text ||

                '';

            if(!body.startsWith('.'))
                return;

            const args =
                body.slice(1).trim().split(/ +/);

            const commandName =
                args.shift().toLowerCase();

            const command =
                commands.get(commandName);

            if(!command)
                return;

            await command.execute(
                sock,
                from,
                args
            );

        } catch(err) {

            console.log(err);
        }
    }
);

    // CONNECTION
    sock.ev.on(
        'connection.update',
        ({
            connection,
            qr
        }) => {

            console.log(
                'STATUS:',
                connection
            );

            // QR
            if(qr) {

                console.log(`
SCAN QR INI
`);

                qrcode.generate(qr, {
                    small: true
                });
            }

            // CONNECTED
            if(connection === 'open') {

                console.log(`
BOT CONNECTED
`);
            }

            // CLOSED
            if(connection === 'close') {

                console.log(`
CONNECTION CLOSED
`);
            }
        }
    );
}

startBot();