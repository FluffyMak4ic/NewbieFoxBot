const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "clean",
    category: "moderation",
    description: "Clean chat",
    run: async (client, message, args) => {

        if (!message.member.hasPermission("MANAGE_MESSAGES"))
            return message.reply("You don't have the required permissions to use this command.").then(m => m.delete(5000));

        const deleteCount = parseInt(args[0], 10);

        if(!deleteCount || deleteCount < 2 || deleteCount > 100)
          return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");

        const fetched = await message.channel.messages.fetch({limit: deleteCount});
        message.channel.bulkDelete(fetched)
          .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));

        const embed = new MessageEmbed()
          .addField("Очистка чата" , `Было удалено ${deleteCount} сообщений.`)
          .setColor("#FF8000")
          .setTimestamp()
          .setFooter(`User ID: ${message.author.id}`)
      
      message.channel.send(embed);
    }
}