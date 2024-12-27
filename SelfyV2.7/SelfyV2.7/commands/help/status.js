const fs = require('fs');
const path = require('path');
const { prefix } = require('../../config/config.json');

module.exports = {
    name: 'status',
    description: 'Affiche les commandes de la catégorie status',

    execute(message, args) {
        // Chemin vers le dossier des commandes status
        const statusCommandsPath = path.join(__dirname, '..', '..', 'commands', 'status');

        if (!fs.existsSync(statusCommandsPath)) {
            return message.channel.send('Aucune commande trouvée pour la catégorie **status**.');
        }

        const files = fs.readdirSync(statusCommandsPath).filter(file => file.endsWith('.js'));

        if (files.length === 0) {
            return message.channel.send('Aucune commande trouvée pour la catégorie **status**.');
        }

        let statusHelpMessage = `# Commandes pour la catégorie **status** :\n`;

        files.forEach(file => {
            const command = require(path.join(statusCommandsPath, file));

            statusHelpMessage += `> **${prefix}${command.name}** : **__${command.description}__**\n`;
            if (command.usage) {
                statusHelpMessage += `>     Usage : *${prefix}${command.name} ${command.usage}*\n`;
            }
        });

        statusHelpMessage += `\n\`\`\`ini\n[ Selfy® - Développé par team RVN ]\n\`\`\``;

        message.channel.send(statusHelpMessage);
    }
};
