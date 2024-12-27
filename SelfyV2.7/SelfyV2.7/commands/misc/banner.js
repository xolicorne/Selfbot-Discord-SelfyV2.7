module.exports = {
    name: 'banner',
    description: 'Affiche la bannière d\'une personne mentionnée.',
    usage: '@mention',
    async execute(message, args) {
        // Vérifier si une personne est mentionnée
        let user = message.mentions.users.first();

        // Si aucune mention n'est trouvée, utiliser l'auteur de la commande
        if (!user) {
            user = message.author;
        }

        // Essayer de récupérer les informations de l'utilisateur, y compris la bannière
        try {
            // Vérifier si l'utilisateur a une bannière avant d'essayer de récupérer l'URL
            if (!user.banner) {
                return message.channel.send(`${user.username} n'a pas de bannière.`)
                    .then(msg => msg.delete({ timeout: 10000 }));
            }

            // Récupérer l'URL de la bannière de l'utilisateur
            const bannerUrl = user.bannerURL({ dynamic: true, size: 1024 });

            // Vérifier si l'URL de la bannière est valide
            if (!bannerUrl) {
                return message.channel.send(`${user.username} n'a pas de bannière.`)
                    .then(msg => msg.delete({ timeout: 10000 }));
            }

            // Envoyer la bannière avec l'image
            message.channel.send(`**Bannière de ${user.username} :**\n${bannerUrl}`)
                .then(msg => setTimeout(() => msg.delete(), 10000));

            // Envoyer la signature
            message.channel.send("\`\`\`ini\n> [ Selfy® - Développé par !\"𝐋𝐮𝐜𝐚𝐬𝐅𝐑® ]\n\`\`\`")
                .then(msg => setTimeout(() => msg.delete(), 10000));

        } catch (error) {
            // Gérer l'erreur Unauthorized et d'autres erreurs possibles
            if (error.code === 50013 || error.code === 40001) {
                return message.channel.send("Je n'ai pas les permissions nécessaires pour récupérer la bannière de cet utilisateur.")
                    .then(msg => msg.delete({ timeout: 10000 }));
            }
            console.error("Erreur lors de la récupération de la bannière :", error);
            message.channel.send("Une erreur s'est produite lors de la récupération de la bannière.")
                .then(msg => msg.delete({ timeout: 10000 }));
        }
    }
};
