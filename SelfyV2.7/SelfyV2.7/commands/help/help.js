const fs = require('fs');
const path = require('path');
const { prefix } = require('../../config/config.json');

module.exports = {
    name: 'help',
    description: 'Affiche les commandes de la catégorie help',

    execute(message, args) {
        // Chemin vers le dossier des commandes help
        const helpCommandsPath = path.join(__dirname, '..', '..', 'commands', 'help');

        if (!fs.existsSync(helpCommandsPath)) {
            return message.channel.send('Aucune commande trouvée pour la catégorie **help**.');
        }

        const files = fs.readdirSync(helpCommandsPath).filter(file => file.endsWith('.js'));

        if (files.length === 0) {
            return message.channel.send('Aucune commande trouvée pour la catégorie **help**.');
        }

        let helpHelpMessage = `# Catégorie des commandes du selfbot :\n`;

        files.forEach(file => {
            const command = require(path.join(helpCommandsPath, file));

            helpHelpMessage += `> **${prefix}${command.name}** : **__${command.description}__**\n`;
            if (command.usage) {
                helpHelpMessage += `>     Usage : *${prefix}${command.name} ${command.usage}*\n`;
            }
        });

        helpHelpMessage += `\n\`\`\`ini\n[ Selfy® - Développé par team RVN ]\n\`\`\``;

        message.channel.send(helpHelpMessage);
    }
};
