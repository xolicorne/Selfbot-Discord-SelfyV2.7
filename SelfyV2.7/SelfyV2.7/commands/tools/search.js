const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'search',
    description: 'Effectue une recherche dans les bases de données',
    usage: '<mot clé>',
    async execute(message, args) {
        if (!args.length) {
            return message.channel.send('Veuillez fournir un mot clé pour effectuer une recherche.');
        }

        const query = args.join(' '); // Combine les arguments pour former le mot clé
        const apiUrl = `http://192.168.1.33:25510/search?query=${encodeURIComponent(query)}`;
        const outputDir = path.join(__dirname, '../../results'); // Répertoire des résultats
        const outputFilePath = path.join(outputDir, 'search_results.txt'); // Chemin du fichier .txt

        // Vérifiez et créez le répertoire si nécessaire
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // Envoyer un message temporaire pour informer de la recherche en cours
        const loadingMessage = await message.channel.send(
            `Recherche en cours pour **"${query}"**...\n\`\`\`ini\n> [ Selfy® - Développé par team RVN ]\n\`\`\``
        );

        try {
            // Effectuer la requête API
            const response = await axios.get(apiUrl);

            // Vérifier si des résultats ont été retournés
            if (!Array.isArray(response.data) || response.data.length === 0) {
                // Modifier le message avec un résultat vide
                return loadingMessage.edit(
                    `Aucun résultat trouvé pour **"${query}"**.\n\`\`\`ini\n> [ Selfy® - Développé par team RVN ]\n\`\`\``
                );
            }

            // Préparer les résultats pour le fichier .txt
            const fileContent = response.data.join('\n'); // Ajouter chaque résultat sur une nouvelle ligne

            // Enregistrer les résultats dans un fichier
            fs.writeFileSync(outputFilePath, fileContent, 'utf-8');

            // Modifier le message initial pour informer du succès
            await loadingMessage.edit(
                `La recherche pour **"${query}"** a été effectuée avec succès. Les résultats sont prêts !\n\`\`\`ini\n> [ Selfy® - Développé par team RVN ]\n\`\`\``
            );

            // Envoyer le fichier avec les résultats
            await message.channel.send({
                files: [{
                    attachment: outputFilePath,
                    name: 'search_results.txt',
                }],
            });

            // Supprimer le fichier après l'envoi
            fs.unlinkSync(outputFilePath);
        } catch (error) {
            // Modifier le message initial en cas d'erreur
            await loadingMessage.edit(
                `Une erreur s'est produite lors de la recherche pour **"${query}"**. Veuillez réessayer plus tard.\n\`\`\`ini\n> [ Selfy® - Développé par team RVN ]\n\`\`\``
            );

            // Supprimer le fichier temporaire s'il existe déjà
            if (fs.existsSync(outputFilePath)) {
                fs.unlinkSync(outputFilePath);
            }
        }
    },
};
