const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "help",
    category: "info",
    description: "All command for bot",
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
            .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
            .setTitle("Все комманды для бота. :3")
            .addField("Пингануть бота" , "```>ping```")
            .addField("Информация об сервере" , "```>server```")
            .addField("Информация об пользователе" , "```>user```")
            .addField("Хелп бота" , "```>help```")
            .addField("Информация об боте" , "```>info```")
            .addField("Сказать через бота ( Админы )" , "```>say <message>```")
            .addField("Очистка чата" , "```>clean <1-100>```")
            .setColor("#FF8000")
            .setTimestamp()
            .setFooter(`User ID: ${message.author.id}`)

        message.channel.send(embed);
    }
}