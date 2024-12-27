const fs = require('fs');
const path = require('path');
const { prefix } = require('../../config/config.json');

module.exports = {
    name: 'utils',
    description: 'Affiche les commandes de la catégorie utils',

    execute(message, args) {
        // Ajuster le chemin pour pointer vers commands/utils
        const utilsCommandsPath = path.join(__dirname, '..', '..', 'commands', 'utils');

        if (!fs.existsSync(utilsCommandsPath)) {
            return message.channel.send('Aucune commande trouvée pour la catégorie **utils**.');
        }

        const files = fs.readdirSync(utilsCommandsPath).filter(file => file.endsWith('.js'));

        if (files.length === 0) {
            return message.channel.send('Aucune commande trouvée pour la catégorie **utils**.');
        }

        let utilsHelpMessage = `# Commandes pour la catégorie **utils** :\n`;

        files.forEach(file => {
            const command = require(path.join(utilsCommandsPath, file));

            utilsHelpMessage += `> **${prefix}${command.name}** : **__${command.description}__**\n`;
            if (command.usage) {
                utilsHelpMessage += `>     Usage : *${prefix}${command.name} ${command.usage}*\n`;
            }
        });

        utilsHelpMessage += `\n\`\`\`ini\n[ Selfy® - Développé par team RVN ]\n\`\`\``;

        message.channel.send(utilsHelpMessage);
    }
};