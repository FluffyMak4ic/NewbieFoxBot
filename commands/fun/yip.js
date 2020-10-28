const { MessageAttachment } = require('discord.js');

module.exports = {
    name: "yip",
    category: "fun",
    description: "Yip yip yip",
    run: async (client, message, args) => {
        await message.delete();
        const attachment = new MessageAttachment('https://tenor.com/view/bark-furry-yip-gif-12332058' + ".gif");
        // Send the attachment in the message channel
        message.channel.send(attachment);
    }
}