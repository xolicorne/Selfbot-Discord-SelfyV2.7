const fs = require('fs');
const path = require('path');

module.exports = (client) => {
    const eventFolders = fs.readdirSync('./events');
    for (const folder of eventFolders) {
        const eventFiles = fs.readdirSync(`./events/${folder}`).filter((file) => file.endsWith('.js'));
        for (const file of eventFiles) {
            const event = require(`../events/${folder}/${file}`);
            const eventName = file.split('.')[0];
            client.on(eventName, (...args) => event.execute(client, ...args));
            console.log(`Événement chargé : ${eventName} depuis ${folder}/${file}`);
        }
    }
};