module.exports = {
    name: 'clear',
    description: 'Supprime un certain nombre de messages dans un salon spécifique ou dans le salon actuel.',
    usage: '<nombre> [id_du_salon]',
    async execute(message, args) {
        // Vérifie si un argument pour le nombre est fourni et qu'il est valide
        if (!args[0] || isNaN(args[0])) {
            return message.channel.send(`Veuillez fournir un nombre valide de messages à supprimer.\n\`\`\`ini\n> [ Selfy® - Développé par team RVN ]\n\`\`\``);
        }

        const numberOfMessages = parseInt(args[0], 10);

        if (numberOfMessages <= 0 || numberOfMessages > 100) {
            return message.channel.send(`Veuillez fournir un nombre compris entre 1 et 100.\n\`\`\`ini\n> [ Selfy® - Développé par team RVN ]\n\`\`\``);
        }

        // Récupère l'ID du salon si fourni, sinon utilise le salon actuel
        const channelId = args[1] || message.channel.id;

        // Récupérer le salon spécifié
        const targetChannel = message.client.channels.cache.get(channelId);
        if (!targetChannel || targetChannel.type !== 'GUILD_TEXT') {
            return message.channel.send(`❌ Impossible de trouver le salon avec l'ID fourni : \`${channelId}\``);
        }

        try {
            // Fetch des messages dans le salon cible
            const fetchedMessages = await targetChannel.messages.fetch({ limit: numberOfMessages });

            // Suppression des messages
            for (const msg of fetchedMessages.values()) {
                await msg.delete();
            }

            // Confirmation dans le salon actuel
            message.channel.send(`✅ ${fetchedMessages.size} messages ont été supprimés avec succès dans le salon <#${channelId}> !`).then(msg => {
                setTimeout(() => msg.delete(), 5000); // Supprime le message de confirmation après 5 secondes
            });
        } catch (error) {
            console.error('Une erreur est survenue lors de la suppression des messages :', error);
            message.channel.send(`❌ Une erreur est survenue lors de la suppression des messages dans le salon <#${channelId}>.`);
        }
    },
};
