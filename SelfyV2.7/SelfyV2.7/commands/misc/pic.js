module.exports = {
    name: 'pic',
    description: 'Affiche l\'avatar d\'une personne mentionnée.',
    usage: '<@mention>',
    execute(message, args) {
        // Vérifier si une personne est mentionnée
        let user = message.mentions.users.first();

        // Si aucune mention n'est trouvée, utiliser l'avatar de l'auteur de la commande
        if (!user) {
            user = message.author;
        }

        // Récupérer l'URL de l'avatar en haute qualité
        const avatarUrl = user.displayAvatarURL({ dynamic: true, size: 1024 });

        // Envoyer la première partie avec l'avatar
        message.channel.send(`**Avatar de ${user.username} :**\n${avatarUrl}`)
            .then(msg => {
                // Supprimer le message après 10 secondes
                setTimeout(() => msg.delete(), 10000);
            });

        // Envoyer la deuxième partie avec la signature
        message.channel.send("\`\`\`ini\n> [ Selfy® - Développé par team RVN ]\n\`\`\`")
            .then(msg => {
                // Supprimer le message après 10 secondes
                setTimeout(() => msg.delete(), 10000);
            });
    }
};
