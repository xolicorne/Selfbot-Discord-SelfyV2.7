module.exports = {
    name: 'rate',
    description: 'Évalue quelque chose sur 10.',
    usage: '<chose>',
    execute(message, args) {
      const thing = args.join(' ');
      if (!thing) {
        return message.reply('Veuillez fournir quelque chose à évaluer.');
      }
  
      const rating = Math.floor(Math.random() * 10) + 1;
      message.channel.send(`J'évalue **${thing}** à **${rating}/10**.\n\`\`\`ini\n> [ Selfy® - Développé par team RVN ]\n\`\`\``);
    },
  };
  