javascript
const { Client, GatewayIntentBits } = require('discord.js');
const sqlite3 = require('sqlite3').verbose();

// 1. Initialisation du bot avec les bonnes permissions
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent // Nécessaire pour lire les messages
    ]
});

// 2. Connexion à SQLite avec les réglages ANTI-BLOCAGE
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) console.error("Erreur de connexion :", err.message);
    else console.log("Base de données connectée.");
});

// Activation du mode WAL et du Timeout pour éviter le message "Database is locked"
db.serialize(() => {
    db.run("PRAGMA journal_mode=WAL;");
    db.run("PRAGMA busy_timeout=5000;");
    // Création d'une table simple pour l'exemple
    db.run("CREATE TABLE IF NOT EXISTS counts (id TEXT PRIMARY KEY, total INTEGER)");
});

// 3. Réponse aux messages
client.on('messageCreate', async (message) => {
    // On ignore les messages des autres bots
    if (message.author.bot) return;

    // Réponse simple à "salut"
    if (message.content.toLowerCase() === 'salut') {
        return message.reply("Salut ! Salut j'espère que tu vas bien.");
    }

    // Commande !ping
    if (message.content === '!ping') {
        return message.channel.send("Pong ! 🏓");
    }
})
