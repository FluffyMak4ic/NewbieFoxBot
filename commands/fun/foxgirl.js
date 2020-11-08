const { MessageEmbed } = require("discord.js");
const unirest = require('unirest');

module.exports = {
    name: 'fox-girl',
    description: 'Дам вам рандомное изображение с девочкой лисой ^^',
    category: "fun",
    aliases: ['fox-girl', 'foxgirl'],
    public: true,
    run: async (client, message, args) => {
        unirest
            .get('https://nekos.life/api/v2/img/fox_girl')
            .then(response => {
                const embed = new MessageEmbed()
                    .setImage(response.body.url)
                    .setColor("#FF8000")
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