const Discord = require('discord.js');
const hypixel = require('./hypixel');

const client = new Discord.Client();
const prefix = "wet";

client.on('ready', function () {
    client.user.setActivity('wetlevel username to check someone\'s level!', { type: 'PLAYING' });
    console.log(`Logged in as ${client.user.username}`);
});

client.on('message', async function (message) {
    const content = message.content;

    if (content.startsWith(prefix)) {
        const pieces = content.split(" ");
        const command = pieces.shift();

        if (command === prefix + 'level') {
            const username = pieces.shift();

            if(message.author.bot)
            return console.log(`${message.author.username} has tried to execute the command, but he's a bot!`);

            if (!username) {
                message.channel.send('Specify a player name!');
                return;
            }

            const level = await hypixel.getLevel(username);

            if (level === null) {
                message.channel.send('Player not found!');
                return;
            }

            message.channel.send(`Level of user: ${level}`);
        }
    }
});

client.login(token);
