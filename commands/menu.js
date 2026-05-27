module.exports = {

    name: 'menu',

    async execute(sock, sender) {

        sock.sendMessage(sender, {

            text:
`
╭──『 LEO MATCH BOT 』
│
├ 💘 .register
├ ❤️ .match
├ 👤 .profile
├ 📜 .menu
│
├ 🔎 .start
├ 🔁 .next
├ ❌ .stop
├ 💖 .like
│
╰────────────
`
        });
    }
};