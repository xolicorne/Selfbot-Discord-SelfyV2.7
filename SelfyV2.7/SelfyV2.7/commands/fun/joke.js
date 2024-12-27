const fetch = require('node-fetch');

module.exports = {
  name: 'joke',
  description: 'Donne une blague aléatoire en français.',
  usage: ' ',
  async execute(message) {
    try {
      // Récupère une blague aléatoire en français depuis JokeAPI
      const res = await fetch('https://v2.jokeapi.dev/joke/Any?lang=fr');
      const data = await res.json();

      // Vérifie le type de blague (programming, general, etc.)
      if (data.type === 'single') {
        // Si la blague est une seule phrase
        message.channel.send(`${data.joke}\n\`\`\`ini\n> [ Selfy® - Développé par team RVN ]\n\`\`\``);
      } else if (data.type === 'twopart') {
        // Si la blague a deux parties (setup et punchline)
        const setupFr = `Question : ${data.setup}`;
        const punchlineFr = `Réponse : ${data.delivery}`;
        message.channel.send(`${setupFr} - ${punchlineFr}\n\`\`\`ini\n> [ Selfy® - Développé par team RVN ]\n\`\`\``);
      } else {
        message.reply('Désolé, je n\'ai pas pu trouver une blague.');
      }
    } catch (err) {
      message.reply('Désolé, je n\'ai pas pu récupérer une blague.');
    }
  },
};
