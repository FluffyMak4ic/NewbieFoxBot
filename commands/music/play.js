const { MessageEmbed } = require("discord.js");
const ytdl = require('ytdl-core');

module.exports = {
    name: "play",
    category: "music",
    description: "Play music",
    run: async (client, message, args) => {
        const url = args.join(" ");

        if (url) {
            const connection = await message.member.voice.channel.join();
            connection.play(ytdl(url, { filter: 'audioonly' })).setVolume(0.2);
            message.react('👌');


        } else {
            message.reply("Вы не отправили сыллку");
        }

    }
}