module.exports = {
    name: 'clean',
    description: 'Supprime un certain nombre de messages envoyés par le self-bot dans le canal actuel.',
    usage: '<nombre>',
    async execute(message, args) {
        // Vérifie si un argument est fourni et que c'est un nombre valide
        if (!args[0] || isNaN(args[0])) {
            return message.channel.send(`Veuillez fournir un nombre valide de messages à supprimer.\n\`\`\`ini\n> [ Selfy® - Développé par team RVN ]\n\`\`\``);
        }

        const numberOfMessages = parseInt(args[0], 10);

        if (numberOfMessages <= 0 || numberOfMessages > 100) {
            return message.channel.send(`Veuillez fournir un nombre compris entre 1 et 100.\n\`\`\`ini\n> [ Selfy® - Développé par team RVN ]\n\`\`\``);
        }

        try {
            // Fetch des messages dans le canal
            const fetchedMessages = await message.channel.messages.fetch({ limit: 100 });
            const messagesToDelete = fetchedMessages.filter(msg => msg.author.id === message.author.id).first(numberOfMessages);

            // Suppression des messages un par un
            for (const msg of messagesToDelete) {
                await msg.delete();
            }
        } catch (error) {
            console.error('Une erreur est survenue lors de la suppression des messages :', error);
        }
    },
};
