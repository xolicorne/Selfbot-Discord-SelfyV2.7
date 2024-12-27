const fs = require('fs');
const path = require('path');
const { prefix } = require('../../config/config.json');

module.exports = {
    name: 'settings',
    description: 'Affiche les commandes de paramétrage du selfbot',

    execute(message, args) {
        // Chemin vers le dossier des commandes settings
        const settingsCommandsPath = path.join(__dirname, '..', '..', 'commands', 'settings');

        if (!fs.existsSync(settingsCommandsPath)) {
            return message.channel.send('Aucune commande trouvée pour la catégorie **settings**.');
        }

        const files = fs.readdirSync(settingsCommandsPath).filter(file => file.endsWith('.js'));

        if (files.length === 0) {
            return message.channel.send('Aucune commande trouvée pour la catégorie **settings**.');
        }

        let settingsHelpMessage = `# Commandes pour la catégorie **settings** :\n`;

        files.forEach(file => {
            const command = require(path.join(settingsCommandsPath, file));

            settingsHelpMessage += `> **${prefix}${command.name}** : **__${command.description}__**\n`;
            if (command.usage) {
                settingsHelpMessage += `>     Usage : *${prefix}${command.name} ${command.usage}*\n`;
            }
        });

        settingsHelpMessage += `\n\`\`\`ini\n[ Selfy® - Développé par team RVN ]\n\`\`\``;

        message.channel.send(settingsHelpMessage);
    }
};
