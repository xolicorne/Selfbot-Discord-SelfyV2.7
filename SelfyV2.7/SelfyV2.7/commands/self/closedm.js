const { Client } = require('discord.js-selfbot-v13'); // Importer la bibliothèque discord.js-selfbot-v13

module.exports = {
  name: 'closedm',
  description: 'Ferme tous les MP',
  usage: ' ',
  async execute(message) {
    // Vérifier si l'auteur de la commande est le bot lui-même
    if (message.author.id !== message.client.user.id) {
      return message.reply('Seul le bot peut exécuter cette commande.');
    }

    // Obtenez tous les salons de DM du client
    const dms = message.client.channels.cache.filter(channel => channel.type === 'DM');
    
    // Parcourez chaque salon et fermez-le
    dms.forEach(async (dmChannel) => {
      try {
        // Supprimez chaque salon de DM (la suppression d'un DM équivaut à le fermer pour le client)
        await dmChannel.delete();
      } catch (error) {
        console.error('Erreur lors de la fermeture du salon de DM :', error);
      }
    });
  },
};
