const Discord = require('discord.js');
const moment  = require('moment');
const { prefix, token } = require('./config.json');

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

const client = new Discord.Client();

client.once('ready', () => {
    client.user.setActivity('>help | >w< Yip Yip', { type: 'LISTENING'});
    console.log('Ready!');
});

client.on('message', async message => {

    if(message.author.bot) return;

    if(!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
  
    if(command === "ping") {
        await message.delete();
        const msg = await message.channel.send("Flying...");
        const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
            .setTitle("🏓 Pong!")
            .addField("ws/API Latency", `${Math.round(client.ws.ping)}ms`)
            .addField("Message Latency is", `${msg.createdTimestamp - message.createdTimestamp}ms`)
            .setColor("#FF8000")
            .setTimestamp()
            .setFooter(`User ID: ${message.author.id}`)
        msg.delete()
        message.channel.send(embed)
    }

    if(command === "clean") {
        const deleteCount = parseInt(args[0], 10);

        if(!deleteCount || deleteCount < 2 || deleteCount > 100)
          return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");

        const fetched = await message.channel.messages.fetch({limit: deleteCount});
        message.channel.bulkDelete(fetched)
          .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));

        const embed = new Discord.MessageEmbed()
          .addField("Очистка чата" , `Было удалено ${deleteCount} сообщений.`)
          .setColor("#FF8000")
          .setTimestamp()
          .setFooter(`User ID: ${message.author.id}`)
      
      message.channel.send(embed);
    }

    if(command === "server-icon") {
        if(!message.guild.splashURL) return message.error('Сервер не имеет сплеша', 6, false);
        let embed = new Discord.MessageEmbed()
            .setColor("#FF8000")
            .setImage(`${message.guild.iconURL}?size=2048`)
        message.channel.send(embed);
    }

    if(command === "server") {
        await message.delete();

        const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
            .setTitle("Информация об сервере.")
            .addField("Название сервера" ,message.guild.name)
            .addField("Всего участников" ,message.guild.memberCount)
            .setColor("#FF8000")
            .setTimestamp()
            .setFooter(`User ID: ${message.author.id}`)
        
        message.channel.send(embed);
    }

    if(command === "user") {

        moment.locale("ru");

        await message.delete();

        let user = message.mentions.users.first() || message.author;

        const joinDiscord = moment(user.createdAt).format('llll');
        const joinServer = moment(user.joinedAt).format('llll');

        const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
            .addField("Ник пользователя" ,user.username + '#' + user.discriminator)
            .addField('Статус', user.presence.status)
            .addField('Роли', `<@&${message.guild.member(message.author)._roles.join('> <@&')}>`)
            .addField('Присоединился', joinServer, true)
            .addField("Аккаунт создан", joinDiscord, true) 
            .setColor("#FF8000")
            .setTimestamp()
            .setFooter(`User ID: ${message.author.id}`)
        
        message.channel.send(embed);
    }

    if (command === "uptime") {
        await message.delete();
        var time = require('os').uptime();
        var uptime = (time + "").toHHMMSS();
        const embed = new Discord.MessageEmbed()
            .addField("Uptime ", uptime)
            .setColor("#FF8000")
            .setTimestamp()
            .setFooter(`User ID: ${message.author.id}`)
        message.channel.send(embed);
    }

    if (command === "help") {
        await message.delete();

        const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
            .setTitle("Все комманды для бота. :3")
            .addField("Пингануть бота" , "```>ping```")
            .addField("Информация об сервере" , "```>server```")
            .addField("Информация об пользователе" , "```>user```")
            .addField("Хелп бота" , "```>help```")
            .addField("Идея для сервера(бета)" , "```>idea <Message>```")
            //.addField("Очистка чата" , "```>clean <1-100>```")
            .setColor("#FF8000")
            .setTimestamp()
            .setFooter(`User ID: ${message.author.id}`)

        message.channel.send(embed);
    }

    if(command === "test-deploy") {
        message.channel.send("Уху да ||блять||. У меня получилось сделать auto deploy.");
    }

    if(command === "idea") {
        await message.delete();

        const message_arg = args.join(" ");

        const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
            .setTitle(":pencil: Идея для сервера")
            .addField("Идея" ,message_arg)
            .setColor("#FF8000")
            .setTimestamp()
            .setFooter(`User ID: ${message.author.id}`)
        
        message.channel.send(embed)
            .then(message => {
                message.react('👍').then(() => message.react('👎'));
            }).catch(() => {
            });
        }

});

client.login(token);