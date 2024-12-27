const fs = require('fs');
const path = require('path');

// Chemin vers les fichiers de configuration
const configFilePath = path.join(__dirname, '../../config/config.json');
const modulesFilePath = path.join(__dirname, '../../config/modules.json');

module.exports = {
  name: 'set',
  description: 'Permet de modifier le token, le prefix ou l\'antigroup dans le fichier de configuration.',
  async execute(message, args) {
    try {
      // Vérifie que l'auteur du message est bien le bot lui-même
      if (message.author.id !== message.client.user.id) {
        return message.reply('Seul le bot peut exécuter cette commande.');
      }

      // Charger les données existantes des fichiers config.json et modules.json
      let configData = { token: '', prefix: '' };
      let modulesData = { antigroup: 'off' }; // Valeur par défaut 'off'

      // Charger config.json
      if (fs.existsSync(configFilePath)) {
        configData = JSON.parse(fs.readFileSync(configFilePath, 'utf-8'));
      }

      // Charger modules.json
      if (fs.existsSync(modulesFilePath)) {
        modulesData = JSON.parse(fs.readFileSync(modulesFilePath, 'utf-8'));
      }

      // Importation dynamique du préfixe à partir de config.json
      const currentPrefix = configData.prefix;

      // Vérifie que l'argument est valide
      const setting = args[0];
      const value = args[1];

      if (!setting || !value) {
        return message.reply(`Usage : \`${currentPrefix}set <token/prefix/antigroup> <valeur>\``);
      }

      // Modifier le prefix ou le token
      if (setting === 'prefix') {
        configData.prefix = value;
      } else if (setting === 'token') {
        configData.token = value;
      } else if (setting === 'antigroup') {
        if (value === 'on') {
          modulesData.antigroup = 'enable';
        } else if (value === 'off') {
          modulesData.antigroup = 'disable';
        } else {
          return message.reply('Choisissez une valeur valide pour antigroup : `on` ou `off`.');
        }
      } else {
        return message.reply('Choisissez une option valide : `prefix`, `token` ou `antigroup`.');
      }

      // Sauvegarder les modifications dans config.json
      fs.writeFileSync(configFilePath, JSON.stringify(configData, null, 2), 'utf-8');
      // Sauvegarder les modifications dans modules.json
      fs.writeFileSync(modulesFilePath, JSON.stringify(modulesData, null, 2), 'utf-8');

      // Répondre à l'utilisateur
      return message.reply(`La configuration a été mise à jour avec succès. Veuillez redémarrer avec **${configData.prefix}** pour que les changements prennent effet.`);
      
    } catch (err) {
      console.error('Erreur lors de l’exécution de la commande set :', err);
      message.reply('Une erreur est survenue lors de la mise à jour de la configuration.');
    }
  },
};
