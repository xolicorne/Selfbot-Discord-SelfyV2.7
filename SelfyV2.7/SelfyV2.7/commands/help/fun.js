const fs = require('fs');
const path = require('path');
const { prefix } = require('../../config/config.json');

module.exports = {
    name: 'fun',
    description: 'Affiche les commandes de la catégorie fun',

    execute(message, args) {
        // Chemin vers le dossier des commandes fun
        const funCommandsPath = path.join(__dirname, '..', '..', 'commands', 'fun');

        if (!fs.existsSync(funCommandsPath)) {
            return message.channel.send('Aucune commande trouvée pour la catégorie **fun**.');
        }

        const files = fs.readdirSync(funCommandsPath).filter(file => file.endsWith('.js'));

        if (files.length === 0) {
            return message.channel.send('Aucune commande trouvée pour la catégorie **fun**.');
        }

        let funHelpMessage = `# Commandes pour la catégorie **fun** :\n`;

        files.forEach(file => {
            const command = require(path.join(funCommandsPath, file));

            funHelpMessage += `> **${prefix}${command.name}** : **__${command.description}__**\n`;
            if (command.usage) {
                funHelpMessage += `>     Usage : *${prefix}${command.name} ${command.usage}*\n`;
            }
        });

        funHelpMessage += `\n\`\`\`ini\n[ Selfy® - Développé par team RVN ]\n\`\`\``;

        message.channel.send(funHelpMessage);
    }
};
