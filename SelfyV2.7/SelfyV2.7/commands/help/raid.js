const fs = require('fs');
const path = require('path');
const { prefix } = require('../../config/config.json');

module.exports = {
    name: 'raid',
    description: 'Affiche les commandes de la catégorie raid',

    execute(message, args) {
        // Chemin vers le dossier des commandes raid
        const raidCommandsPath = path.join(__dirname, '..', '..', 'commands', 'raid');

        if (!fs.existsSync(raidCommandsPath)) {
            return message.channel.send('Aucune commande trouvée pour la catégorie **raid**.');
        }

        const files = fs.readdirSync(raidCommandsPath).filter(file => file.endsWith('.js'));

        if (files.length === 0) {
            return message.channel.send('Aucune commande trouvée pour la catégorie **raid**.');
        }

        let raidHelpMessage = `# Commandes pour la catégorie **raid** :\n`;

        files.forEach(file => {
            const command = require(path.join(raidCommandsPath, file));

            raidHelpMessage += `> **${prefix}${command.name}** : **__${command.description}__**\n`;
            if (command.usage) {
                raidHelpMessage += `>     Usage : *${prefix}${command.name} ${command.usage}*\n`;
            }
        });

        raidHelpMessage += `\n\`\`\`ini\n[ Selfy® - Développé par team RVN ]\n\`\`\``;

        message.channel.send(raidHelpMessage);
    }
};
