const validStatuses = ['online', 'idle', 'dnd', 'invisible'];

module.exports = {
    name: 'setstatus',
    description: 'Change le statut du bot : `online`, `idle`, `dnd`, `invisible`.',
    usage: '<status>',
    execute(message, args) {
        // Vérifier si un statut a été fourni
        if (!args.length) {
            return message.channel.send(`Veuillez fournir un statut parmi : \`${validStatuses.join(', ')}\`.`);
        }

        const status = args[0].toLowerCase();

        // Vérifier si le statut est valide
        if (!validStatuses.includes(status)) {
            return message.channel.send(`Statut invalide. Veuillez choisir parmi : \`${validStatuses.join(', ')}\`.`);
        }

        // Changer le statut du bot
        try {
            message.client.user.setStatus(status);
            message.channel.send(`Statut mis à jour avec succès : **${status}**.`);
        } catch (error) {
            console.error('Erreur lors du changement de statut :', error);
            message.channel.send(`Une erreur s'est produite lors du changement de statut.`);
        }
    }
};
