const fs = require('fs');
const path = require('path');
const { prefix } = require('../../config/config.json');

module.exports = {
    name: 'self',
    description: 'Affiche les commandes de la catégorie self',

    execute(message, args) {
        // Chemin vers le dossier des commandes self
        const selfCommandsPath = path.join(__dirname, '..', '..', 'commands', 'self');

        if (!fs.existsSync(selfCommandsPath)) {
            return message.channel.send('Aucune commande trouvée pour la catégorie **self**.');
        }

        const files = fs.readdirSync(selfCommandsPath).filter(file => file.endsWith('.js'));

        if (files.length === 0) {
            return message.channel.send('Aucune commande trouvée pour la catégorie **self**.');
        }

        let selfHelpMessage = `# Commandes pour la catégorie **self** :\n`;

        files.forEach(file => {
            const command = require(path.join(selfCommandsPath, file));

            selfHelpMessage += `> **${prefix}${command.name}** : **__${command.description}__**\n`;
            if (command.usage) {
                selfHelpMessage += `>     Usage : *${prefix}${command.name} ${command.usage}*\n`;
            }
        });

        selfHelpMessage += `\n\`\`\`ini\n[ Selfy® - Développé par team RVN ]\n\`\`\``;

        message.channel.send(selfHelpMessage);
    }
};
