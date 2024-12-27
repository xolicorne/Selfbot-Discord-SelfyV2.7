const { joinVoiceChannel } = require('@discordjs/voice');
const { Client } = require('discord.js-selfbot-v13');

module.exports = {
    name: 'joinvc',
    description: 'Fait rejoindre le bot à un salon vocal spécifique sur un serveur donné et le mute.',
    usage: '<ID du serveur> <ID du salon vocal>',
    async execute(message, args) {
        // Vérifie si au moins deux arguments sont fournis (ID du serveur et ID du salon vocal)
        if (args.length < 2) {
            return message.channel.send("Veuillez spécifier l'ID du serveur **et** l'ID du salon vocal. Usage : `joinvc <ID du serveur> <ID du salon vocal>`");
        }

        const guildId = args[0];
        const channelId = args[1];

        // Récupérer le serveur (guild) à partir de son ID
        const guild = message.client.guilds.cache.get(guildId);
        if (!guild) {
            return message.channel.send("Je ne trouve pas ce serveur. Assurez-vous que l'ID est correct et que je suis membre du serveur.");
        }

        // Récupérer le salon vocal à partir de son ID
        const channel = guild.channels.cache.get(channelId);
        if (!channel || channel.type !== 'GUILD_VOICE') {
            return message.channel.send("Je ne trouve pas ce salon vocal. Assurez-vous que l'ID est correct et qu'il s'agit bien d'un salon vocal.");
        }

        try {
            // Rejoindre le salon vocal
            const connection = joinVoiceChannel({
                channelId: channel.id,
                guildId: guild.id,
                adapterCreator: guild.voiceAdapterCreator,
            });

            // Mettre le bot en sourdine une fois connecté
            connection.on('stateChange', (oldState, newState) => {
                if (newState.status === 'connected') {
                    connection.voice.setSelfMute(true); // Mute le bot
                    message.channel.send(`Je suis maintenant dans le salon vocal **${channel.name}** du serveur **${guild.name}** et je suis muté.`);
                }
            });
        } catch (error) {
            console.error("Erreur lors de la tentative de rejoindre le salon vocal :", error);
            message.channel.send("Une erreur s'est produite lors de la tentative de rejoindre le salon vocal.");
        }
    },
};
