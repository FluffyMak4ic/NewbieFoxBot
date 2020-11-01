const { MessageEmbed } = require("discord.js");
const moment  = require('moment');

module.exports = {
    name: "user",
    category: "info",
    description: "Information for user",
    run: async (client, message, args) => {
        moment.locale("ru");

        let user = message.mentions.users.first() || message.author;

        const joinDiscord = moment(user.createdAt).format('llll');
        const joinServer = moment(user.joinedAt).format('llll');

        console.log(user);

        const embed = new MessageEmbed()
            .setAuthor(`${user.username}`, `${user.displayAvatarURL({ dynamic: true })}`)
            .addField("Ник пользователя" ,user.username + '#' + user.discriminator)
            .addField('Статус', user.presence.status, true)
            .addField("Бот", user.bot, true)
            .addField('Роли', `<@&${message.guild.member(user)._roles.join('> <@&')}>`)
            .addField('Присоединился', joinServer, true)
            .addField("Аккаунт создан", joinDiscord, true) 
            .setColor("#FF8000")
            .setTimestamp()
            .setFooter(`User ID: ${message.author.id}`)

        console.log(user.presence.status);
        
        message.channel.send(embed);
    }
}