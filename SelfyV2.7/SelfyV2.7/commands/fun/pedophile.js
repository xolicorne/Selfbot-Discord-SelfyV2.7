module.exports = {
    name: 'pedo',
    description: 'Calcule le pourcentage de pédophile de quelqu’un.',
    usage: '<@mention>',
    execute(message, args) {
        const target = message.mentions.users.first() || message.author;
        const percentage = Math.floor(Math.random() * 101); // Pourcentage aléatoire entre 0 et 100
        const response = `🚨 ${target.username} est pédophile à **${percentage}%** !\n\`\`\`ini\n> [ Selfy® - Développé par team RVN ]\n\`\`\``;
        message.channel.send(response);
    },
};
