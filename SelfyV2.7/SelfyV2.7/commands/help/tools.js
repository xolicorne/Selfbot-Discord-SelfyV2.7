const fs = require('fs');
const path = require('path');
const { prefix } = require('../../config/config.json');

module.exports = {
    name: 'tools',
    description: 'Affiche les commandes de la catégorie tools',

    execute(message, args) {
        // Ajuster le chemin pour pointer vers commands/tools
        const toolsCommandsPath = path.join(__dirname, '..', '..', 'commands', 'tools');

        if (!fs.existsSync(toolsCommandsPath)) {
            return message.channel.send('Aucune commande trouvée pour la catégorie **tools**.');
        }

        const files = fs.readdirSync(toolsCommandsPath).filter(file => file.endsWith('.js'));

        if (files.length === 0) {
            return message.channel.send('Aucune commande trouvée pour la catégorie **tools**.');
        }

        let toolsHelpMessage = `# Commandes pour la catégorie **tools** :\n`;

        files.forEach(file => {
            const command = require(path.join(toolsCommandsPath, file));

            toolsHelpMessage += `> **${prefix}${command.name}** : **__${command.description}__**\n`;
            if (command.usage) {
                toolsHelpMessage += `>     Usage : *${prefix}${command.name} ${command.usage}*\n`;
            }
        });

        toolsHelpMessage += `\n\`\`\`ini\n[ Selfy® - Développé par team RVN ]\n\`\`\``;

        message.channel.send(toolsHelpMessage);
    }
};
