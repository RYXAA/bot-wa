module.exports = {

    name: 'ping',

    async execute(sock, from) {

        await sock.sendMessage(
            from,
            {
                text: 'PONG 🏓'
            }
        );
    }
};