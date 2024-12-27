module.exports = {
    name: 'spam',
    description: 'Spamm un message donné un nombre spécifié de fois.',
    cooldown: 5,
    usage: '<nombre> <message>',
    async execute(message, args) {
        const { prefix } = require('../../config/config.json');

        if (args.length < 2) {
            return message.reply(`Veuillez fournir un nombre de répétitions et un message. Exemple: \`${prefix}spam 5 Hello\`\n\`\`\`ini\n> [ Selfy® - Développé par team RVN ]\n\`\`\``);
        }

        const count = parseInt(args[0]);
        const spamMessage = args.slice(1).join(' ');

        if (isNaN(count) || count <= 0) {
            return message.reply(`Veuillez entrer un nombre valide de répétitions.\n\`\`\`ini\n> [ Selfy® - Développé par team RVN ]\n\`\`\``);
        }

        const limit = 100;
        if (count > limit) {
            return message.reply(`Le nombre de répétitions ne peut pas dépasser ${limit}.\n\`\`\`ini\n> [ Selfy® - Développé par team RVN ]\n\`\`\``);
        }

        if (message.author.cooldown && message.author.cooldown > Date.now()) {
            const timeLeft = (message.author.cooldown - Date.now()) / 1000;
            return message.reply(`Veuillez attendre ${timeLeft.toFixed(1)} secondes avant de réutiliser la commande.\n\`\`\`ini\n> [ Selfy® - Développé par team RVN ]\n\`\`\``);
        }

        for (let i = 0; i < count; i++) {
            try {
                await message.channel.send(spamMessage);
            } catch (err) {
                console.error('Erreur lors de l\'envoi du message:', err);
                break;
            }
        }

        message.author.cooldown = Date.now() + this.cooldown * 1000;
    },
};