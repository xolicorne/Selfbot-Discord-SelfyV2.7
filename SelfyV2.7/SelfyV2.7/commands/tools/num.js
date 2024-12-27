const axios = require('axios');

module.exports = {
    name: 'num',
    description: 'Effectue un lookup sur un numéro de téléphone pour afficher ses infos.',
    usage: '<numéro de téléphone>',
    async execute(message, args) {
        if (args.length !== 1) {
            return message.channel.send(`Veuillez fournir un numéro de téléphone valide.\`\n\`\`\`ini\n> [ Selfy® - Développé par team RVN ]\n\`\`\``);
        }

        let phoneNumber = args[0].trim();

        // Ajout de l'indicatif +33 pour les numéros français
        if (phoneNumber.startsWith('0')) {
            phoneNumber = '+33' + phoneNumber.slice(1);
        }

        // Construire l'URL avec la clé API et le numéro de téléphone
        const apiKey = 'num_live_BJoNR0fvpwEqIH2vAiHuUwUuPQsxwdIOHmLaRXUr';
        const url = `https://api.numlookupapi.com/v1/validate/${phoneNumber}?apikey=${apiKey}`;

        try {
            const response = await axios.get(url);
            const data = response.data;

            if (data.valid) {
                const resultMessage = `
# Informations pour le numéro ${phoneNumber} :
> **Pays** : ${data.country_name || 'Inconnu'}
> **Indicatif** : ${data.country_prefix || 'Inconnu'}
> **Code pays** : ${data.country_code || 'Inconnu'}
> **Numéro local** : ${data.local_format || 'Inconnu'}
> **Format international** : ${data.international_format || 'Inconnu'}
> **Opérateur** : ${data.carrier || 'Inconnu'}
> **Type de ligne** : ${data.line_type || 'Inconnu'}
> **Localisation** : ${data.location || 'Inconnue'}
\`\`\`ini
> [ Selfy® - Développé par team RVN ]
\`\`\``;

                message.channel.send(resultMessage);
            } else {
                message.channel.send(`Le numéro **${phoneNumber}** est invalide ou aucune information n'est disponible.\n\`\`\`ini\n> [ Selfy® - Développé par team RVN ]\n\`\`\``);
            }
        } catch (error) {
            console.error(error);
            message.channel.send('Une erreur est survenue lors du lookup du numéro de téléphone.');
        }
    },
};