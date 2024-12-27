module.exports = {
    name: 'clearstatus',
    description: 'Réinitialise l\'activité du bot, en supprimant toute activité en cours.',
    usage: ' ',
    execute(message, args) {
        // Réinitialiser l'activité du bot
        try {
            // Mettre l'activité sur "aucune" (null) pour réinitialiser
            message.client.user.setActivity(null)
                .then(() => {
                    // Envoyer un message de confirmation
                    message.channel.send('Activité réinitialisée avec succès. Le bot ne montre plus d\'activité.')
                        .then(sentMessage => {
                            // Supprimer le message après 10 secondes
                            setTimeout(() => {
                                sentMessage.delete().catch(console.error); // Ignorer les erreurs de suppression
                            }, 10000);
                        });
                })
                .catch(error => {
                    console.error('Erreur lors de la réinitialisation de l\'activité :', error);
                    message.channel.send('Une erreur est survenue lors de la réinitialisation de l\'activité.');
                });
        } catch (error) {
            console.error('Erreur générale :', error);
            message.channel.send('Une erreur s\'est produite lors de la tentative de suppression de l\'activité.');
        }
    }
};
