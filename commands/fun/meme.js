const { MessageEmbed } = require("discord.js");
const randomPuppy = require('random-puppy');

module.exports = {
    name: "meme",
    category: "fun",
    description: "Random reddit meme",
    run: async (client, message, args) => {

        message.channel.startTyping();

        const reddit = [
            "furry_irl",
            "Pikabu",
            "linuxmemes",
            "memes",
            "ProgrammerHumor"
        ];

        const subreddit = reddit[Math.floor(Math.random() * reddit.length - 1)]

        randomPuppy(subreddit)
            .then(url => {
                const embed = new MessageEmbed()
                    .setDescription("Meme >w<")
                    .setImage(url)
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