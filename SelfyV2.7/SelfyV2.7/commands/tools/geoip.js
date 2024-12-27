const axios = require('axios');
const path = require('path');

module.exports = {
    name: 'geoip',
    description: 'Effectue une recherche sur l\'IP donnée et renvoie des informations géographiques et réseau détaillées.',
    usage: '<ip>',
    async execute(message, args) {
        const { prefix } = require(path.join(__dirname, '../../config/config.json'));

        if (args.length !== 1) {
            return message.channel.send(`Veuillez fournir une adresse IP à rechercher. Exemple: \`${prefix}geoip 82.67.77.169\`\n\`\`\`ini\n> [ Selfy® - Développé par team RVN ]\n\`\`\``);
        }

        const ip = args[0];
        const mainApiUrl = `https://api.ipapi.is/?q=${ip}`;
        const reverseApiUrl = `http://ip-api.com/json/${ip}?fields=66846719`;

        try {
            // Appels aux deux APIs en parallèle
            const [mainResponse, reverseResponse] = await Promise.all([
                axios.get(mainApiUrl),
                axios.get(reverseApiUrl),
            ]);

            const mainData = mainResponse.data;
            const reverseData = reverseResponse.data;

            if (reverseData.status !== 'success') {
                return message.channel.send(`Erreur lors de la récupération des données pour l'IP ${ip}.\n\`\`\`ini\n> [ Selfy® - Développé par team RVN ]\n\`\`\``);
            }

            const geoInfo = `
# Voici les informations pour l'IP ${mainData.ip} :
> **Continent**: ${reverseData.continent} (${reverseData.continentCode})
> **Pays**: ${mainData.country} (${reverseData.countryCode})
> **Région**: ${reverseData.regionName || mainData.state} (${reverseData.region || mainData.state})
> **Ville**: ${reverseData.city || mainData.city}
> **Code postal**: ${reverseData.zip || mainData.location?.zip || 'Non spécifié'}
> **Latitude**: ${reverseData.lat || mainData.location?.latitude}
> **Longitude**: ${reverseData.lon || mainData.location?.longitude}
> **Fuseau horaire**: ${reverseData.timezone || mainData.location?.timezone}
> **Décalage horaire**: UTC${reverseData.offset >= 0 ? `+${reverseData.offset / 3600}` : `${reverseData.offset / 3600}`}
> **Devise**: ${reverseData.currency || mainData.currency || 'Non spécifiée'}
> **ISP**: ${reverseData.isp || mainData.isp}
> **Organisation**: ${reverseData.org || mainData.company?.name}
> **ASN**: ${reverseData.as || mainData.asn?.asn} (${reverseData.asname || mainData.asn?.descr})
> **Network Route**: ${mainData.asn?.route || 'Non spécifié'}
> **Datacenter**: ${mainData.datacenter?.datacenter || 'Non spécifié'} (${mainData.datacenter?.domain || 'Non spécifié'})
> **VPN**: ${mainData.vpn?.is_vpn ? 'Oui' : 'Non'} (${mainData.vpn?.service ? `Service: ${mainData.vpn.service}` : 'Non spécifié'})
> **Proxy**: ${mainData.is_proxy ? 'Oui' : 'Non'}
> **Tor**: ${mainData.is_tor ? 'Oui' : 'Non'}
> **Is Bogon?**: ${mainData.is_bogon ? 'Oui' : 'Non'}
> **Is Mobile?**: ${mainData.is_mobile ? 'Oui' : 'Non'}
> **Is Crawler?**: ${mainData.is_crawler ? 'Oui' : 'Non'}
> **Is Datacenter?**: ${mainData.is_datacenter ? 'Oui' : 'Non'}
> **Reverse DNS**: ${reverseData.reverse || 'Non spécifié'}
\`\`\`ini\n> [ Selfy® - Développé par team RVN ]\n\`\`\`
`;

            await message.channel.send(geoInfo);
        } catch (error) {
            console.error('Erreur lors de la commande geoip:', error);
            return message.channel.send(`Une erreur est survenue lors de la recherche pour l'IP ${ip}.\n\`\`\`ini\n> [ Selfy® - Développé par team RVN ]\n\`\`\``);
        }
    },
};