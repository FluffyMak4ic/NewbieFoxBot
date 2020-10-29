const { MessageEmbed } = require("discord.js");
const randomPuppy = require('random-puppy');

module.exports = {
    name: "meme",
    category: "fun",
    description: "Random reddit meme",
    run: async (client, message, args) => {
        randomPuppy("furry_irl`")
            .then(url => {
                const embed = new MessageEmbed()
                    .setTitle("Meme >w<")
                    .addField("API Latency", `${Math.round(client.ws.ping)}ms`)
                    .addField("Message Latency is", `${msg.createdTimestamp - message.createdTimestamp}ms`)
                    .setImage(url)
                    .setColor("#FF8000")
                    .setTimestamp()
                    .setFooter(`User ID: ${message.author.id}`)
                message.channel.send(embed)
            })
            .catch(error => {
                const embed = new MessageEmbed()
                    .setDescription(`:octagonal_sign: Произошла ошибка ${error}`)
                    .setColor("#FF8000")
                    .setTimestamp()
                    .setFooter(`User ID: ${message.author.id}`)
                message.channel.send(embed)
            })
    }
}