const { MessageEmbed } = require("discord.js");
const unirest = require('unirest');

module.exports = {
    name: "fox",
    category: "fun",
    description: "Random fox image",
    run: async (client, message, args) => {

        message.channel.startTyping();

        unirest
            .get('https://randomfox.ca/floof/')
            .then(response => {
                const embed = new MessageEmbed()
                    .setDescription("Fox")
                    .setImage(response.body.image)
                    .setColor("#FF8000")
                    .setTimestamp()
                    .setFooter(`User ID: ${message.author.id}`)
                message.channel.stopTyping(true);
                message.channel.send(embed)
            })
            .catch(error => {
                const embed = new MessageEmbed()
                    .setDescription(`:octagonal_sign: Произошла ошибка: ${error}`)
                    .setColor("#FF8000")
                    .setTimestamp()
                    .setFooter(`User ID: ${message.author.id}`)
                message.channel.stopTyping(true);
                message.channel.send(embed)
            })
    }
}