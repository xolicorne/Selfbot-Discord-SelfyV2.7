module.exports = {
    name: 'find',
    description: 'Permet de trouver un utilisateur en vocal',
    usage: '<id>',
    async execute(message, args) {
        if (!args.length) {
            return message.channel.send('Veuillez fournir l\'ID d\'un utilisateur pour le trouver en vocal.');
        }

        const userId = args[0]; // Récupérer l'ID de l'utilisateur à rechercher
        let memberFound = false; // Variable pour savoir si l'utilisateur a été trouvé

        // Parcourir tous les serveurs où le bot est présent
        for (const [guildId, guild] of message.client.guilds.cache) {
            try {
                // Chercher le membre dans le cache du serveur
                let member = guild.members.cache.get(userId);

                if (!member) {
                    // Si le membre n'est pas dans le cache, essayer de le récupérer avec fetch
                    try {
                        member = await guild.members.fetch(userId);
                    } catch (error) {
                        // Si le membre n'existe pas sur le serveur, ignorer cette erreur et continuer
                        continue;
                    }
                }

                if (member) {
                    // Vérifier si le membre est dans un salon vocal
                    const voiceChannel = member.voice.channel;

                    if (voiceChannel) {
                        // Mentionner l'utilisateur et le salon vocal
                        message.channel.send(`<@${member.user.id}> est dans le salon vocal <#${voiceChannel.id}> sur le serveur **${guild.name}**.\n\`\`\`ini\n> [ Selfy® - Développé par team RVN ]\n\`\`\``);
                        memberFound = true;
                        break; // On a trouvé l'utilisateur, donc on arrête de chercher
                    }
                }
            } catch (error) {
                console.error(`Erreur lors de la recherche de l'utilisateur dans le serveur ${guild.name}:`, error);
                continue; // Continuer avec le prochain serveur si une erreur se produit
            }
        }

        // Si l'utilisateur n'a pas été trouvé en vocal dans les serveurs du bot
        if (!memberFound) {
            message.channel.send(`Aucun utilisateur trouvé avec l'ID : ${userId} sur les serveurs. Il peut ne pas être sur un serveur ou pas en vocal actuellement.\n\`\`\`ini\n> [ Selfy® - Développé par team RVN ]\n\`\`\``);
        }
    }
};
