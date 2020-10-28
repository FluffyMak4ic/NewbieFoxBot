const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "info",
    category: "info",
    description: "Information on bot",
    run: async (client, message, args) => {
        String.prototype.toHHMMSS = function () {
            var sec_num = parseInt(this, 10); // don't forget the second param
            var hours   = Math.floor(sec_num / 3600);
            var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
            var seconds = sec_num - (hours * 3600) - (minutes * 60);
        
            if (hours   < 10) {hours   = "0"+hours;}
            if (minutes < 10) {minutes = "0"+minutes;}
            if (seconds < 10) {seconds = "0"+seconds;}
            var time    = hours+':'+minutes+':'+seconds;
            return time;
        }
        var time = require('os').uptime();
        var mem  = Math.floor(process.memoryUsage().heapTotal / 1024 / 1024) ;
        var uptime = (time + "").toHHMMSS();
        const embed = new MessageEmbed()
            .addField(":watch: Uptime", uptime)
            .addField(":floppy_disk: ОЗУ", `${mem} мб`)
            .setColor("#FF8000")
            .setTimestamp()
            .setFooter(`User ID: ${message.author.id}`)
        message.channel.send(embed);
    }
}