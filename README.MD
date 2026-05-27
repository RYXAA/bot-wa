# 🤖 WhatsApp Bot Multi Command

Bot WhatsApp sederhana menggunakan library Baileys dengan sistem command handler modern, ringan, dan mudah dikembangkan.

![NodeJS](https://img.shields.io/badge/Node.js-20.x-green)
![Baileys](https://img.shields.io/badge/Baileys-Latest-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## ✨ Features

- ⚡ Fast Response
- 🤖 Multi Command System
- 📁 Command Handler
- 🔒 Session Login
- 📱 WhatsApp Multi Device
- 🛠 Easy To Edit
- 🔥 Lightweight

---

## 📸 Preview

```bash
STATUS: open

BOT CONNECTED

Command Example:

.ping
.menu
📂 Project Structure
project/
│
├── commands/
│   ├── ping.js
│   └── menu.js
│
├── session/
│
├── index.js
├── package.json
└── README.md
🚀 Installation
1. Clone Repository
git clone https://github.com/RYXAA/bot-wa.git
2. Masuk Folder
cd REPOSITORY
3. Install Dependencies
npm install
▶️ Run Bot
node index.js
📱 Login WhatsApp
Jalankan bot
Scan QR Code yang muncul
Tunggu sampai muncul:
BOT CONNECTED
⚡ Command Example
Ping Command
.ping

Response:

PONG 🏓
🛠 Create New Command

Buat file baru di folder:

commands/

Contoh commands/hello.js

module.exports = {

    name: 'hello',

    async execute(sock, from) {

        await sock.sendMessage(
            from,
            {
                text: 'Hello World!'
            }
        );
    }
};

Lalu gunakan command:

.hello
📦 Dependencies
@whiskeysockets/baileys
pino
qrcode-terminal

Install manual:

npm install @whiskeysockets/baileys pino qrcode-terminal
⚠️ Important

Jangan upload file sensitif ke GitHub seperti:

session/
.env
token
credentials

Tambahkan ke .gitignore

session/
.env
node_modules/
👑 Author

Made with ❤️ by YOUR NAME

⭐ Support

Kalau suka project ini jangan lupa:

⭐ Star Repository
🍴 Fork Repository