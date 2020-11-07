const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "invite",
    category: "info",
    description: "Invite bot",
    run: async (client, message, args) => {
        client.generateInvite([
            "CONNECT", "SPEAK", "READ_MESSAGES", "SEND_MESSAGES", "SEND_TTS_MESSAGES",
            "ATTACH_FILES", "USE_VAD"
        ]).then( link => {
            message.channel.send(link);
        });
    }
}