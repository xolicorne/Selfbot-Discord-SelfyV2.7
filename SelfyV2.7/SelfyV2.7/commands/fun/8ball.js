const responses = [
    'Oui.',
    'Non.',
    'Peut-être.',
    'Je ne sais pas.',
    'Certainement.',
    'C\'est peu probable.',
    'Absolument pas.',
    'Je ne peux pas répondre à ça.',
    'Réessaie plus tard.',
  ];
  
  module.exports = {
    name: '8ball',
    description: 'Pose une question à la boule magique !',
    usage: '<question>',
    execute(message, args) {
      if (!args.length) {
        return message.reply('Pose une question !');
      }
  
      const question = args.join(' ');
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  
      message.reply(`Tu as demandé : **${question}**\nRéponse : **${randomResponse}**\n\`\`\`ini\n> [ Selfy® - Développé par team RVN ]\n\`\`\``);
    },
  };
  