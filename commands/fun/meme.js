const { MessageEmbed } = require("discord.js");
const unirest          = require('unirest');

module.exports = {
    name: "meme",
    category: "fun",
    description: "Random reddit meme",
    run: async (client, message, args) => {

        message.channel.startTyping();

        const reddit = [
            "furry_irl",
            "Pikabu",
            "linuxmemes",
            "memes",
            "ProgrammerHumor"
        ];

        const subreddit = reddit[Math.floor(Math.random() * reddit.length - 1)]

        const url = `https://www.reddit.com/r/${subreddit}/hot/.json?limit=100`;

        unirest
            .get(url)
            .then(response => {
                let data = response.body;

                var index = data.data.children[Math.floor(Math.random() * 99) + 1].data;

                var image = index.preview.images[0].source.url.replace('&amp;', '&');
                var title = index.title;
                var link = 'https://reddit.com' + index.permalink;
                var subRedditName = index.subreddit_name_prefixed;

                if (index.over_18) {
                    const embed = new MessageEmbed()
                        .setDescription(`:octagonal_sign: Ошибка этот пост с 18+ контентом.`)
                        .setColor("#FF8000")
                        .setTimestamp()
                        .setFooter(`User ID: ${message.author.id}`)
                    message.channel.stopTyping(true);
                    message.channel.send(embed)
                    return;
                }

                console.log(index.post_hint);

                if (index.post_hint == "hosted:video") {
                    const embed = new MessageEmbed()
                        .setDescription(`:octagonal_sign: Ошибка этот пост c видео.`)
                        .setColor("#FF8000")
                        .setTimestamp()
                        .setFooter(`User ID: ${message.author.id}`)
                    message.channel.stopTyping(true);
                    message.channel.send(embed)
                    return;
                }

                const imageembed = new MessageEmbed()
                .setTitle(subRedditName)
                .setImage(image)
                .setDescription(`[${title}](${link})`)
                .setURL(`https://reddit.com/${subRedditName}`)
                .setColor("#FF8000")
                .setTimestamp()
                .setFooter(`User ID: ${message.author.id}`)
                message.channel.send(imageembed)

                message.channel.stopTyping(true);
            })
            .catch(error => {
                const embed = new MessageEmbed()
                    .setDescription(`:octagonal_sign: Произошла ошибка: ${error}`)
                    .setColor("#FF8000")
                    .setTimestamp()
                    .setFooter(`User ID: ${message.author.id}`)
                message.channel.stopTyping(true);
                message.channel.send(embed)
            });
    }
}