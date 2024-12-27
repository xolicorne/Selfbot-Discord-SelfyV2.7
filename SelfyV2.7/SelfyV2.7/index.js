const { Client } = require('discord.js-selfbot-v13');
const fs = require('fs');
const path = require('path');
const client = new Client();

// Chargement des fichiers de configuration
const config = require('./config/config.json');
const allowed = require('./config/allowed.json');

// Ajout d'un anti-crash
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection:', reason);
});
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

// Création des collections pour commandes et événements
client.commands = new Map();

// Chargement dynamique des handlers
['commandHandler', 'eventHandler'].forEach((handler) => {
    require(`./handlers/${handler}`)(client);
});

// Connexion au compte
client.login(config.token).then(() => {
    console.log(`Connecté en tant que ${client.user.tag}`);
}).catch((err) => {
    console.error('Erreur lors de la connexion :', err);
});
