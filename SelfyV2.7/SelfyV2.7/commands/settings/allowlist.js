const fs = require('fs');
const path = require('path');

// Chemin vers le fichier JSON
const allowedFilePath = path.join(__dirname, '../../config/allowed.json');

module.exports = {
  name: 'allowlist',
  description: 'Affiche la liste des utilisateurs autorisés.',
  usage: ' ',
  async execute(message, args) {
    try {
      // Vérifie que l'auteur du message est bien le selfbot (le bot lui-même)
      if (message.author.id !== message.client.user.id) {
        return message.reply('Seul le selfbot peut exécuter cette commande.');
      }

      // Charger les données existantes
      let allowedData = { allowedUsers: [] };
      if (fs.existsSync(allowedFilePath)) {
        allowedData = JSON.parse(fs.readFileSync(allowedFilePath, 'utf-8'));
      }

      // Vérifier s'il y a des utilisateurs dans la liste
      if (allowedData.allowedUsers.length === 0) {
        return message.reply('Aucun utilisateur autorisé dans la liste.');
      }

      // Créer une réponse listant les utilisateurs autorisés
      const userList = allowedData.allowedUsers.map((id) => `<@${id}>`).join(', ');

      // Répondre avec la liste des utilisateurs autorisés et mise en page
      const response = `# Voici la liste des utilisateurs autorisés :\n> ${userList}\n\n\`\`\`ini\n> [ Selfy® - Développé par team RVN ]\n\`\`\``;

      await message.reply(response);
    } catch (err) {
      console.error('Erreur lors de l’exécution de la commande allowlist :', err);
    }
  },
};
