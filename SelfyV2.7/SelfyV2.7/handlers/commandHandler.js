const fs = require('fs');
const path = require('path');
const config = require('../config/config.json');
const allowedUsers = require('../config/allowed.json').allowedUsers;

module.exports = (client) => {
    const commandFolders = fs.readdirSync('./commands');
    for (const folder of commandFolders) {
        const commandFiles = fs.readdirSync(`./commands/${folder}`).filter((file) => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`../commands/${folder}/${file}`);
            client.commands.set(command.name, command);
            console.log(`Commande chargée : ${command.name} depuis ${folder}/${file}`);
        }
    }

    // Stocke les derniers messages supprimés pour chaque serveur
    client.snipes = new Map();

    client.on('messageDelete', (message) => {
        // Vérifie que le message existe et que l'auteur est défini
        if (!message || !message.author) return;
    
        // Stocke le dernier message supprimé pour chaque canal
        client.snipes.set(message.channel.id, {
            content: message.content,
            author: message.author,
            timestamp: message.createdTimestamp,
        });
    });
        

    client.on('messageCreate', async (message) => {
        // Vérifie si le message vient du selfbot ou d'un utilisateur autorisé
        const isAllowedUser = message.author.id === client.user.id || allowedUsers.includes(message.author.id);
        if (!isAllowedUser) return;

        const prefix = config.prefix;
        if (!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        const command = client.commands.get(commandName);

        if (command) {
            try {
                await command.execute(message, args);
            } catch (error) {
                console.error(`Erreur lors de l'exécution de la commande ${commandName}:`, error);
            }

            if (message.deletable) {
                message.delete().catch(console.error);
            }
        }
    });
};
