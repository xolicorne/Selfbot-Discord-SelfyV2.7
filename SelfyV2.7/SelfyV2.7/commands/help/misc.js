const fs = require('fs');
const path = require('path');
const { prefix } = require('../../config/config.json');

module.exports = {
    name: 'misc',
    description: 'Affiche les commandes de la catégorie misc',

    execute(message, args) {
        // Chemin vers le dossier des commandes misc
        const miscCommandsPath = path.join(__dirname, '..', '..', 'commands', 'misc');

        if (!fs.existsSync(miscCommandsPath)) {
            return message.channel.send('Aucune commande trouvée pour la catégorie **misc**.');
        }

        const files = fs.readdirSync(miscCommandsPath).filter(file => file.endsWith('.js'));

        if (files.length === 0) {
            return message.channel.send('Aucune commande trouvée pour la catégorie **misc**.');
        }

        let miscHelpMessage = `# Commandes pour la catégorie **misc** :\n`;

        files.forEach(file => {
            const command = require(path.join(miscCommandsPath, file));

            miscHelpMessage += `> **${prefix}${command.name}** : **__${command.description}__**\n`;
            if (command.usage) {
                miscHelpMessage += `>     Usage : *${prefix}${command.name} ${command.usage}*\n`;
            }
        });

        miscHelpMessage += `\n\`\`\`ini\n[ Selfy® - Développé par team RVN ]\n\`\`\``;

        message.channel.send(miscHelpMessage);
    }
};
