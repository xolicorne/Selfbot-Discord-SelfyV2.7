const dns = require('dns');
const util = require('util');

module.exports = {
    name: 'reverse',
    description: 'Effectue une recherche DNS inversée sur un nom de domaine ou une IP.',
    usage: '<nom de domaine ou IP>',
    async execute(message, args) {
        const resolveReverse = util.promisify(dns.reverse);
        const resolveDns = util.promisify(dns.resolve);

        if (args.length !== 1) {
            return message.channel.send(`Veuillez fournir une IP ou un nom de domaine à vérifier.\n\`\`\`ini\n> [ Selfy® - Développé par team RVN ]\n\`\`\``);
        }

        const target = args[0];

        try {
            let reverseResult = [];
            let dnsInfo = [];

            // DNS inversé
            try {
                reverseResult = await resolveReverse(target);
            } catch (reverseError) {
                reverseResult = [`Aucun Reverse DNS trouvé pour ${target}.`];
            }

            // Informations DNS
            try {
                dnsInfo = await resolveDns(target);
            } catch (dnsError) {
                dnsInfo = [`Aucun enregistrement DNS trouvé pour ${target}.`];
            }

            const resultMessage = `
# Résultats pour ${target} :
> **Reverse DNS** : ${reverseResult.join(', ')}
> **Enregistrements DNS** :
${dnsInfo.map((entry, idx) => `> - [${idx + 1}] ${entry}`).join('\n')}
\`\`\`ini
> [ Selfy® - Développé par team RVN ]
\`\`\`
`;

            return message.channel.send(resultMessage);
        } catch (error) {
            console.error('Erreur lors de la commande reverse:', error);
            return message.channel.send(`Une erreur est survenue lors de la recherche pour ${target}.\n\`\`\`ini\n> [ Selfy® - Développé par team RVN ]\n\`\`\``);
        }
    },
};