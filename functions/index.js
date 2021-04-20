const { exec } = require('child_process');

let admins = [ // ids of users
  "635323524713807914"
]

function isAdmin(id) {
    if (admins.includes(id)) {
        return true;
    } else {
        return false;
    }
}

let cmd = {
    status: function(msg) {
        exec('service minecraft status', (err, stdout, stderr) => {
            if (err !== null) {
                console.log('exec error: ' + err)
                msg.channel.send("An error occurred.");
            } else {
                msg.channel.send(stdout);
            }
        });
    },
    notAnAdmin: function(msg) {
        msg.channel.send("You are not an admin!");
    },
    notACommand: function(msg) {
        msg.channel.send("That is not a command. Please use !help for a list of available commands.")
    },
    restart: function(msg) {
        if (isAdmin(msg.author.id)) {
            exec('sh ../scripts/restart_server.sh', (err, stdout, stderr) => {
                if (err !== null) {
                    console.log('exec error: ' + err)
                    msg.channel.send("An error occurred.");
                } else {
                    msg.channel.send("Restarting server (this will also restart this bot). Please wait up to three minutes to try again.");
                }
            });
        }
    }
}

let commands = new Map();
commands.set("status", cmd.status);

module.exports.cmd = cmd;
module.exports.commands = commands;