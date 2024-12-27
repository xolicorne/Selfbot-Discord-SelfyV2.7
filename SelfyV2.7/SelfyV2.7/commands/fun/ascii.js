const figlet = require('figlet');

module.exports = {
  name: 'ascii',
  description: 'Convertit du texte en art ASCII.',
  usage: '<texte>',
  execute(message, args) {
    const text = args.join(' ');
    if (!text) {
      return message.reply('Veuillez fournir un texte à convertir.');
    }

    figlet(text, (err, data) => {
      if (err) {
        message.reply('Impossible de générer l\'art ASCII.');
      } else {
        message.channel.send('```' + data + '```');
      }
    });
  },
};
