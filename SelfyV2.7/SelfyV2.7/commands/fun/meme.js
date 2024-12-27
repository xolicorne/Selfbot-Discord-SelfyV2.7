const fetch = require('node-fetch');

module.exports = {
  name: 'meme',
  description: 'Envoie un mème aléatoire.',
  usage: ' ',
  async execute(message) {
    try {
      // Récupère un mème aléatoire
      const res = await fetch('https://meme-api.com/gimme');
      const data = await res.json();
      const memeUrl = data.url;

      // Envoie le mème
      await message.channel.send(memeUrl);
      
      // Envoie la signature dans un second message
      await message.channel.send('```ini\n> [ Selfy® - Développé par team RVN ]\n```');

    } catch (err) {
      message.reply('Impossible de récupérer un mème, désolé !');
    }
  },
};
