const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    category: "info",
    description: "Returns latency and API ping",
    run: async (client, message, args) => {
        await message.delete();
        const msg = await message.channel.send("Flying...");
        const embed = new MessageEmbed()
            .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
            .setTitle("🏓 Pong!")
            .addField("API Latency", `${Math.round(client.ws.ping)}ms`)
            .addField("Message Latency is", `${msg.createdTimestamp - message.createdTimestamp}ms`)
            .setColor("#FF8000")
            .setTimestamp()
            .setFooter(`User ID: ${message.author.id}`)
        msg.delete()
        message.channel.send(embed)
    }
}