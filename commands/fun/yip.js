module.exports = {
    name: "yip",
    category: "fun",
    description: "Yip yip yip",
    run: async (client, message, args) => {
        const attachment = new MessageAttachment('https://tenor.com/view/bark-furry-yip-gif-12332058');
        // Send the attachment in the message channel
        message.channel.send(attachment);
    }
}