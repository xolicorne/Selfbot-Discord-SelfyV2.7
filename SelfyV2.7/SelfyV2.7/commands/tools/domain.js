const dns = require('dns');
const util = require('util');
const url = require('url');

module.exports = {
    name: 'domain',
    description: 'Effectue un lookup sur un nom de domaine ou une URL pour afficher ses infos et IP.',
    usage: '<nom de domaine ou URL>',
    async execute(message, args) {
        const resolveAny = util.promisify(dns.resolveAny);
        const resolve4 = util.promisify(dns.resolve4);
        const resolve6 = util.promisify(dns.resolve6);

        if (args.length !== 1) {
            return message.channel.send(`Veuillez fournir un nom de domaine ou une URL à analyser.\`\n\`\`\`ini\n> [ Selfy® - Développé par team RVN ]\n\`\`\``);
        }

        let domain;
        try {
            const parsedUrl = new URL(args[0]);
            domain = parsedUrl.hostname;
        } catch {
            // Si ce n'est pas une URL, on traite directement comme un domaine
            domain = args[0].toLowerCase().replace(/^www\./, '');
        }

        try {
            let ipv4Addresses = [];
            let ipv6Addresses = [];
            let anyRecords = [];

            // Résolution IPv4
            try {
                ipv4Addresses = await resolve4(domain);
            } catch {
                ipv4Addresses = ['Aucune IPv4 trouvée.'];
            }

            // Résolution IPv6
            try {
                ipv6Addresses = await resolve6(domain);
            } catch {
                ipv6Addresses = ['Aucune IPv6 trouvée.'];
            }

            // Autres enregistrements DNS
            try {
                anyRecords = await resolveAny(domain);
            } catch {
                anyRecords = ['Aucun enregistrement DNS trouvé.'];
            }

            // Création du message de réponse
            const resultMessage = `
# Informations pour ${domain} :
> **Nom de domaine** : ${domain}
> **Adresses IPv4** : ${ipv4Addresses.join(', ')}
> **Adresses IPv6** : ${ipv6Addresses.join(', ')}
> **Enregistrements DNS** :
${anyRecords
                .map((record, idx) => `> - [${idx + 1}] ${JSON.stringify(record)}`)
                .join('\n')}
\`\`\`ini
> [ Selfy® - Développé par !"𝐋𝐮𝐜𝐚𝐬𝐟𝐑® ]
\`\`\`
`;

            return message.channel.send(resultMessage);
        } catch (error) {
            console.error('Erreur lors du lookup de domaine:', error);
            return message.channel.send(`Une erreur est survenue lors de la recherche pour ${domain}.\n\`\`\`ini\n> [ Selfy® - Développé par team RVN ]\n\`\`\``);
        }
    },
};