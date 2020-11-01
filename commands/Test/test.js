module.exports = {
    name: "test",
    category: "test",
    description: "test",
    run: async (client, message, args) => {
        
        /*
        message.reply('Invalid command!')
            .then(msg => {
              msg.delete({ timeout: 2000 })
            })
            .catch(console.error);

        message.delete();
        */

        message.channel.send("=")
            .then(msg => {
                let t = "="
                for (let i = 0; i < 99; i++) {
                    t += "="
                    msg.edit(t);
                }
            })
    }
}