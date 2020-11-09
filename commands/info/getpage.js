const { MessageEmbed } = require("discord.js");
const unirest = require('unirest');

module.exports = {
    name: "getpage",
    category: "info",
    description: "Page get in telegra.ph",
    run: async (client, message, args) => {

        message.channel.startTyping();

        if (args[0]) {

            const postname = args.join(" ");

            unirest
            .get(`https://api.telegra.ph/getPage/${postname}?return_content=true`)
            .then(respone => {
                const embed = new MessageEmbed()
                    .setTitle(respone.body.result.title)
                    .setAuthor(respone.body.result.author_name, "https://telegra.ph/images/logo.png", respone.body.result.url)
                    .addField('Views', respone.body.result.views, false)
                    .setDescription(respone.body.result.content[0].children)
                    .setColor("#FF8000")
                    .setTimestamp()
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
            });

        } else {
            const embed = new MessageEmbed()
                .setDescription(`:octagonal_sign: Ошибка. Вы не вели название статьи.`)
                .setColor("#FF8000")
                .setTimestamp()
                .setFooter(`User ID: ${message.author.id}`)
            message.channel.stopTyping(true);
            message.channel.send(embed)
            return;
        }
    }
}