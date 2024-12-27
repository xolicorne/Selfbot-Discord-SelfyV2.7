module.exports = {
    name: 'serverinfo',
    description: 'Affiche des informations détaillées sur un serveur.',
    usage: '<ID du serveur>',
    async execute(message, args) {
        // Si la commande est utilisée en DM, on demande un serveur spécifique
        if (!message.guild) {
            if (args.length === 0) {
                return message.channel.send("Veuillez spécifier l'ID ou le nom du serveur pour récupérer ses informations.");
            }

            const serverID = args[0];
            const guild = message.client.guilds.cache.get(serverID);

            if (!guild) {
                return message.channel.send("Impossible de trouver ce serveur. Assurez-vous que l'ID est correct et que je fais partie de ce serveur.");
            }

            // Récupérer les informations du propriétaire
            let owner;
            try {
                owner = await guild.fetchOwner();
            } catch (error) {
                owner = null; // Si l'on ne peut pas récupérer le propriétaire, on met "Inconnu"
            }

            // Récupérer la date de création du serveur
            const createdAt = guild.createdAt;
            const daysSinceCreation = Math.floor((Date.now() - createdAt) / (1000 * 60 * 60 * 24));

            // Récupérer la date où l'utilisateur a rejoint le serveur
            const joinedAt = message.client.guilds.cache.get(serverID).members.cache.get(message.author.id).joinedAt;
            const daysSinceJoin = Math.floor((Date.now() - joinedAt) / (1000 * 60 * 60 * 24));

            // Récupérer la bannière du serveur
            const bannerUrl = guild.bannerURL({ dynamic: true, size: 1024 }) || 'Pas de bannière';

            // Récupérer la bannière d'invitation du serveur
            const inviteBannerUrl = guild.splashURL({ dynamic: true, size: 1024 }) || 'Pas de bannière';

            // Récupérer la photo du serveur (icône)
            const iconUrl = guild.iconURL({ dynamic: true, size: 1024 });

            // Construire le message avec toutes les informations du serveur
            let serverInfoMessage = `# **Informations sur le serveur :**\n\n`;
            serverInfoMessage += `> **Nom :** ▸ ${guild.name}\n`;
            serverInfoMessage += `> **ID :** ${guild.id}\n`;
            serverInfoMessage += `> **Propriétaire :** ${owner ? owner.user.tag : 'Inconnu'}\n`;
            serverInfoMessage += `> **ID du propriétaire :** ${owner ? owner.user.id : 'Inconnu'}\n`;
            serverInfoMessage += `> **Salons :** ${guild.channels.cache.size}\n`;
            serverInfoMessage += `> **Rôles :** ${guild.roles.cache.size}\n`;
            serverInfoMessage += `> **Membres :** ${guild.memberCount}\n`;
            serverInfoMessage += `> **Bots :** ${guild.members.cache.filter(member => member.user.bot).size}\n`;
            serverInfoMessage += `> **Date de création :** <t:${Math.floor(createdAt.getTime() / 1000)}:f> (il y a ${daysSinceCreation} jours)\n`;
            serverInfoMessage += `> **Sur le serveur depuis :** <t:${Math.floor(joinedAt.getTime() / 1000)}:f> (il y a ${daysSinceJoin} jours)\n`;
            serverInfoMessage += `> **Bannière du serveur :** ${bannerUrl}\n`;
            serverInfoMessage += `> **Photo du serveur :** ${iconUrl}\n`;
            serverInfoMessage += `> **Bannière d'invitation :** ${inviteBannerUrl}\n`;

            // Envoyer le message dans le DM
            message.channel.send(serverInfoMessage)
                .then(msg => {
                    // Supprimer le message après 10 secondes
                    setTimeout(() => msg.delete(), 10000);
                })
                .catch(error => {
                    console.error('Erreur lors de l\'envoi des informations du serveur:', error);
                    message.channel.send('Une erreur s\'est produite en récupérant les informations du serveur.')
                        .then(msg => msg.delete({ timeout: 10000 }));
                });

            // Ajouter la signature dans un second message (sans #)
            message.channel.send("```ini\n> [ Selfy® - Développé par team RVN ]\n```")
                .then(msg => {
                    // Supprimer le message après 10 secondes
                    setTimeout(() => msg.delete(), 10000);
                })
                .catch(error => {
                    console.error('Erreur lors de l\'envoi de la signature:', error);
                });

        } else {
            // Si la commande est utilisée dans un serveur, afficher les infos du serveur actuel
            const guild = message.guild;

            // Récupérer les informations du propriétaire
            let owner;
            try {
                owner = await guild.fetchOwner();
            } catch (error) {
                owner = null; // Si l'on ne peut pas récupérer le propriétaire, on met "Inconnu"
            }

            // Récupérer la date de création du serveur
            const createdAt = guild.createdAt;
            const daysSinceCreation = Math.floor((Date.now() - createdAt) / (1000 * 60 * 60 * 24));

            // Récupérer la date où l'utilisateur a rejoint le serveur
            const joinedAt = message.member.joinedAt;
            const daysSinceJoin = Math.floor((Date.now() - joinedAt) / (1000 * 60 * 60 * 24));

            // Récupérer la bannière du serveur
            const bannerUrl = guild.bannerURL({ dynamic: true, size: 1024 }) || 'Pas de bannière';

            // Récupérer la bannière d'invitation du serveur
            const inviteBannerUrl = guild.splashURL({ dynamic: true, size: 1024 }) || 'Pas de bannière';

            // Récupérer la photo du serveur (icône)
            const iconUrl = guild.iconURL({ dynamic: true, size: 1024 });

            // Construire le message avec toutes les informations du serveur
            let serverInfoMessage = `# **Informations sur le serveur :**\n\n`;
            serverInfoMessage += `> **Nom :** ▸ ${guild.name}\n`;
            serverInfoMessage += `> **ID :** ${guild.id}\n`;
            serverInfoMessage += `> **Propriétaire :** ${owner ? owner.user.tag : 'Inconnu'}\n`;
            serverInfoMessage += `> **ID du propriétaire :** ${owner ? owner.user.id : 'Inconnu'}\n`;
            serverInfoMessage += `> **Salons :** ${guild.channels.cache.size}\n`;
            serverInfoMessage += `> **Rôles :** ${guild.roles.cache.size}\n`;
            serverInfoMessage += `> **Membres :** ${guild.memberCount}\n`;
            serverInfoMessage += `> **Bots :** ${guild.members.cache.filter(member => member.user.bot).size}\n`;
            serverInfoMessage += `> **Date de création :** <t:${Math.floor(createdAt.getTime() / 1000)}:f> (il y a ${daysSinceCreation} jours)\n`;
            serverInfoMessage += `> **Sur le serveur depuis :** <t:${Math.floor(joinedAt.getTime() / 1000)}:f> (il y a ${daysSinceJoin} jours)\n`;
            serverInfoMessage += `> **Bannière du serveur :** ${bannerUrl}\n`;
            serverInfoMessage += `> **Photo du serveur :** ${iconUrl}\n`;
            serverInfoMessage += `> **Bannière d'invitation :** ${inviteBannerUrl}\n`;

            // Envoyer le message dans le canal
            message.channel.send(serverInfoMessage)
                .then(msg => {
                    // Supprimer le message après 10 secondes
                    setTimeout(() => msg.delete(), 10000);
                })
                .catch(error => {
                    console.error('Erreur lors de l\'envoi des informations du serveur:', error);
                    message.channel.send('Une erreur s\'est produite en récupérant les informations du serveur.')
                        .then(msg => msg.delete({ timeout: 10000 }));
                });

            // Ajouter la signature dans un second message (sans #)
            message.channel.send("```ini\n> [ Selfy® - Développé par team RVN ]\n```")
                .then(msg => {
                    // Supprimer le message après 10 secondes
                    setTimeout(() => msg.delete(), 10000);
                })
                .catch(error => {
                    console.error('Erreur lors de l\'envoi de la signature:', error);
                });
        }
    }
};
