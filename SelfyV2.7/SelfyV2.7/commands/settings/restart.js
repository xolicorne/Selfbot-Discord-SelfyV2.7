const cooldowns = new Map(); // Crée une map pour gérer les cooldowns

module.exports = {
  name: 'restart',
  description: 'Redémarre le bot.',
  async execute(message, args) {
    // Vérifie que l'utilisateur est le bot lui-même
    if (message.author.id !== message.client.user.id) {
      return message.reply('Seul le selfbot peut exécuter cette commande.');
    }

    // Vérifie si l'utilisateur est dans le cooldown
    const now = Date.now();
    const cooldownAmount = 61000; // 61 secondes en millisecondes
    const lastExecution = cooldowns.get(message.author.id);

    if (lastExecution && now - lastExecution < cooldownAmount) {
      const remainingTime = cooldownAmount - (now - lastExecution);
      return message.reply(`Veuillez patienter encore ${Math.ceil(remainingTime / 1000)} secondes avant de redémarrer à nouveau.`);
    }

    // Met à jour le cooldown pour cet utilisateur
    cooldowns.set(message.author.id, now);

    // Répond à l'utilisateur avant de fermer le bot
    await message.reply('Le bot va redémarrer...').then(() => {
      // Ferme le processus actuel, ce qui redémarre automatiquement le bot si le processus est surveillé
      process.exit(); // Cette ligne arrête le bot
    });
  },
};
