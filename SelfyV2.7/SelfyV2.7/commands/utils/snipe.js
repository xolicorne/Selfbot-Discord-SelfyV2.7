module.exports = {
    name: 'snipe',
    description: 'Voir le dernier message supprimé dans ce canal.',
    usage: ' ',
    execute(message, args) {
        const channel = message.channel;

        const snipeData = message.client.snipes.get(channel.id);

        if (!snipeData) {
            return message.reply("Aucun message supprimé récemment dans ce canal.");
        }

        const authorTag = snipeData.author ? snipeData.author.tag : 'Auteur inconnu';

        const responseMessage = `Dernier message supprimé dans ce canal :\n\n**Auteur :** ${authorTag}\n**Message :** ${snipeData.content || "*Aucun contenu*"}\n**Date de suppression :** <t:${Math.floor(snipeData.timestamp / 1000)}:f>\n\`\`\`ini\n> [ Selfy® - Développé par team RVN ]\n\`\`\``;

        message.channel.send(responseMessage);
    },
};