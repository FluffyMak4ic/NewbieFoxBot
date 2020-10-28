const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "server",
    category: "info",
    description: "Information for server",
    run: async (client, message, args) => {
        function checkDays(date) {
            let now = new Date();
            let diff = now.getTime() - date.getTime();
            let days = Math.floor(diff / 86400000);
            return days + (days == 1 ? " день" : " дней") + " назад";
        };

        const region = {
            "brazil": ":flag_br: Brazil",
            "eu-central": ":flag_eu: Central Europe",
            "singapore": ":flag_sg: Singapore",
            "us-central": ":flag_us: U.S. Central",
            "sydney": ":flag_au: Sydney",
            "us-east": ":flag_us: U.S. East",
            "us-south": ":flag_us: U.S. South",
            "us-west": ":flag_us: U.S. West",
            "eu-west": ":flag_eu: Western Europe",
            "vip-us-east": ":flag_us: VIP U.S. East",
            "london": ":flag_gb: London",
            "amsterdam": ":flag_nl: Amsterdam",
            "hongkong": ":flag_hk: Hong Kong",
            "russia": ":flag_ru: Russia",
            "southafrica": ":flag_za:  South Africa"
        };

        const voiceChannelCount = message.guild.channels.cache.filter(c => c.type === 'voice').size;
        const textChannelCount = message.guild.channels.cache.filter(c => c.type === 'text').size;
        const nsfwChannelCount = message.guild.channels.cache.filter(c => c.nsfw === true).size;

        var serverIcon = message.guild.iconURL();

        const embed = new MessageEmbed()
            .setTitle(":fox: Информация о сервере")
            .setThumbnail(serverIcon)
            .addField("Название сервера", message.guild.name)
            .addField("Индификатор", message.guild.id)
            .addField("Регион", region[message.guild.region])
            .addField("Количесто юзеров", message.guild.memberCount)
            .addField(":pencil: Текстовых каналы", textChannelCount, true)
            .addField(":sound: Аудио каналы", voiceChannelCount, true)
            .addField(":underage: Nsfw каналы", nsfwChannelCount, true)
            .addField("Дата создание сервера", `${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})`)
            .setColor("#FF8000")
            .setTimestamp()
        message.channel.send(embed);
    }
}