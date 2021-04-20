require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;

const { exec } = require("child_process");

function notAnAdmin(msg) {
  msg.channel.send("you are not an admin!")
}
function notACommand(msg) {
  msg.channel.send("That's not a command homie")
}
function status(msg) {
  exec("service minecraft status", (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`)
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`)
    }
    console.log(`stdout: ${stdout}`)
  })
  // msg.channel.send("status check")
}

let commands = new Map();
commands.set("status", status);

let admins = [ // ids of users
  "635323524713807914"
]

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
  console.info(msg.content)
  // console.log(msg)
 if (msg.content[0] === '!') {
  if (admins.includes(msg.author.id)) {
    console.log("passed admin check")
    const command = msg.content.split(" ")[0].substr(1);
    if (commands.has(command)) {
      console.log(command + " is a command.")
      commands.get(command)(msg)
    } else {
      notACommand(msg);
    }
  } else {
    notAnAdmin(msg);
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
