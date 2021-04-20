require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;

const { cmd, commands } = require('./functions')

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
  console.info(msg.content)
  // console.log(msg)
 if (msg.content[0] === '!') { // if message starts with "!"
  const command = msg.content.split(" ")[0].substr(1);
  if (commands.has(command)) {
    console.log(command + " is a command.")
    commands.get(command)(msg)
  } else {
    cmd.notACommand();
  }
 }
  // if (msg.content === 'ping') {
  //   msg.reply('pong');
  //   msg.channel.send('pong');

  // } else if (msg.content.startsWith('!kick')) {
  //   if (msg.mentions.users.size) {
  //     const taggedUser = msg.mentions.users.first();
  //     msg.channel.send(`You wanted to kick: ${taggedUser.username}`);
  //   } else {
  //     msg.reply('Please tag a valid user!');
  //   }
  // }
});
