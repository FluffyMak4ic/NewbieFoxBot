const { Client, Collection } = require('discord.js');
const { config } = require('dotenv');

const client = new Client({
    disableMentions: "everyone"
});

client.commands = new Collection();
client.aliases  = new Collection();

config({ path: "C:/Users/mak4ic/Desktop/NewbieFoxBot/.env" });

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
})

client.on("ready", () => {
    console.log(`Hi, ${client.user.username} is now online`);
    client.user.setActivity('>help | >w< Yip Yip', { type: 'LISTENING'});
});

/*

client.on("guildMemberAdd", member => {
    console.log("New user!");
    const newbie_channel_id = member.guild.channels.cache.find(c => c.name === "log");
    if(!newbie_channel_id) 
        console.log('No channel unverified');
    const unverified = member.guild.roles.cache.find(r => r.name === "unverified");
    if(!unverified) {
        member.guild.roles.create({
            data: {
                name: "unverified",
                color: "#3E5159"
            },
            reason: 'Этой роли небыло. Бот ее создал.'
        })
        .then(console.log)
        .catch(console.error)
    }
    member.roles.add(unverified.id);
    newbie_channel_id.send(`Hello, <@!${member.id}>!`);
});

*/

client.on("message", async message => {
    const prefix = ">";

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;

    // If message.member is uncached, cache it.
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    // Get the command
    let command = client.commands.get(cmd);
    // If none is found, try to find it by alias
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    // If a command is finally found, run the command
    if (command) 
        command.run(client, message, args);
});

client.login(process.env.TOKEN);
