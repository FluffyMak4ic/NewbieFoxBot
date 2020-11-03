const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "leave",
    category: "music",
    description: "Play music",
    run: async (client, message, args) => {
        if (message.member.voice.channel) {
            const connection = await message.member.voice.channel.leave();
        } else {
            message.reply('You need to join a voice channel first!');
        }
    }
}