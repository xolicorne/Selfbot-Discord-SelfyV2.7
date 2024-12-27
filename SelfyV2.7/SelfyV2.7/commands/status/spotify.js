module.exports = {
    name: 'spotify',
    description: 'Change l’activité du bot pour indiquer qu\'il écoute un morceau Spotify.',
    usage: '<text>',
    execute(message, args) {
        // Vérifier qu'un texte a été fourni pour la commande
        if (args.length < 1) {
            return message.channel.send(`Veuillez fournir le nom d'une chanson ou un texte. Usage : \`${this.usage}\``);
        }

        const activityText = args.join(' ');

        // Configurer l'activité à écouter de la musique sur Spotify
        const activityOptions = {
            type: 'LISTENING', // Type d'activité: "Listening to"
            url: 'https://open.spotify.com/user/spotify', // URL générique vers Spotify (vous pouvez aussi spécifier un morceau spécifique si vous en avez un)
        };

        // Changer l'activité du bot
        try {
            message.client.user.setActivity(activityText, activityOptions);

            // Envoyer un message de confirmation
            message.channel.send(`Activité mise à jour avec succès : **Listening to Spotify - ${activityText}**.`)
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
