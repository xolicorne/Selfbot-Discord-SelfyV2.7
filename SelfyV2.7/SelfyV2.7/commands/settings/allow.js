const fs = require('fs');
const path = require('path');
const { prefix } = require('../../config/config.json');

// Chemin vers le fichier JSON
const allowedFilePath = path.join(__dirname, '../../config/allowed.json');

module.exports = {
  name: 'allow',
  description: 'Ajoute un utilisateur à la liste des utilisateurs autorisés.',
  usage: '<ID ou mention d\'utilisateur>',
  async execute(message, args) {
    try {
      // Vérifie si l'auteur est bien le bot
      if (message.author.id !== message.client.user.id) {
        return message.reply('Seul le selfbot peut exécuter cette commande.');
      }

      // Vérifie si un ID est passé en argument ou une mention est fournie
      const userId = args[0]?.replace(/[<@!>]/g, '') || (message.mentions?.users?.first()?.id);

      if (!userId) {
        return message.reply('Erreur : Aucun utilisateur mentionné ou ID fourni.');
      }

      // Charger les données existantes
      let allowedData = { allowedUsers: [] };
      if (fs.existsSync(allowedFilePath)) {
        allowedData = JSON.parse(fs.readFileSync(allowedFilePath, 'utf-8'));
      }

      // Vérifier si l'utilisateur est déjà dans la liste
      if (allowedData.allowedUsers.includes(userId)) {
        return message.reply(`L'utilisateur ${userId} est déjà autorisé.`);
      }

      // Ajouter l'utilisateur à la liste
      allowedData.allowedUsers.push(userId);

      // Sauvegarder les modifications
      fs.writeFileSync(allowedFilePath, JSON.stringify(allowedData, null, 2), 'utf-8');

      // Répondre à l'utilisateur
      await message.reply(`L'utilisateur ${userId} a été ajouté à la liste autorisée. Veuillez redémarrer avec **${prefix}** pour que les changements prennent effet.`);
    } catch (err) {
      console.error('Erreur lors de l’exécution de la commande allow :', err);
    }
  },
};
