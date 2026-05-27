const fs = require('fs');

module.exports = {

    name: 'register',

    async execute(sock, sender, args) {

        const text = args.join(' ');

        const data = text.split('|');

        if(data.length < 6) {

            return sock.sendMessage(sender, {

                text:
`
Format:

.register nama|umur|gender|interest|hobby|lokasi

Contoh:
.register Bintang|18|cowok|cewek|coding,musik|Jakarta
`
            });
        }

        const [
            name,
            age,
            gender,
            interest,
            hobby,
            location
        ] = data;

        const users = JSON.parse(
            fs.readFileSync('./database/users.json')
        );

        const exists = users.find(
            x => x.id === sender
        );

        if(exists) {

            return sock.sendMessage(sender, {
                text: '❌ Sudah register.'
            });
        }

        users.push({

            id: sender,

            name,

            age: Number(age),

            gender,

            interest,

            hobby: hobby.split(','),

            location
        });

        fs.writeFileSync(
            './database/users.json',
            JSON.stringify(users, null, 2)
        );

        sock.sendMessage(sender, {
            text:
`✅ Register berhasil.`
        });
    }
};