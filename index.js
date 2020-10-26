const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();

client.once('ready', () => {
    client.user.setActivity('>help | >w< Yip Yip', { type: 'LISTENING' });
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

        message.reply(`было удалено ${deleteCount} сообщений(я).`)
            .then(message => {
                message.react("👍")
            }).catch(() => {
            });
    }

    if(command === "server") {
        await message.delete();

        const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
            .setTitle("Информация об сервере.")
            .addField("Название сервера" ,message.guild.name)
            .addField("Всего участников" ,message.guild.memberCount)
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter(`User ID: ${message.author.id}`)
        
        message.channel.send(embed);
    }

    if(command === "user") {
        await message.delete();

        const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
            .setTitle("Информация об пользователе.")
            .addField("Ник пользователя" ,message.author.username)
            .addField("Id пользователя" ,message.author.id)
            .setColor("RANDOM")
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