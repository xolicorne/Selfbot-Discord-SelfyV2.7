module.exports = {
    name: 'setrpc',
    description: 'Change l’activité du bot (watching, playing, listening, streaming) et définit le texte associé.',
    usage: '<type> <texte>',
    execute(message, args) {
        const validActivityTypes = ['playing', 'watching', 'listening', 'streaming'];

        // Vérifier que le type d'activité et le texte sont fournis
        if (args.length < 2) {
            return message.channel.send(`Usage incorrect. Veuillez utiliser : \`${this.usage}\`. Les types valides sont : \`${validActivityTypes.join(', ')}\`.`);
        }

        const activityType = args[0].toLowerCase();
        const activityText = args.slice(1).join(' ');

        // Vérifier si le type d'activité est valide
        if (!validActivityTypes.includes(activityType)) {
            return message.channel.send(`Type d'activité invalide. Veuillez choisir parmi : \`${validActivityTypes.join(', ')}\`.`);
        }

        // Configurer les options pour l'activité
        const activityOptions = {
            type: activityType.toUpperCase(), // Discord accepte les types en majuscules
        };

        // Si l'activité est "streaming", ajouter l'URL
        if (activityType === 'streaming') {
            activityOptions.url = 'https://twitch.tv/alvineee';
        }

        // Changer l'activité du bot
        try {
            message.client.user.setActivity(activityText, activityOptions);

            // Envoyer le message de confirmation
            message.channel.send(`Activité mise à jour avec succès : **${activityType} ${activityText}**.`)
                .then(sentMessage => {
                    // Supprimer le message après 10 secondes
                    setTimeout(() => {
                        sentMessage.delete().catch(console.error); // Ignorer les erreurs de suppression
                    }, 10000);
                });
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l’activité :', error);
            message.channel.send(`Une erreur s'est produite lors de la mise à jour de l'activité.`);
        }
    }
};
