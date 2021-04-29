const { exec } = require('child_process');

let admins = [ // ids of users
  "635323524713807914",
  "817088476968517674"
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
    botStatus: function(msg) {
        exec('service mc-discord-bot status', (err, stdout, stderr) => {
            if (err !== null) {
                console.log('exec error: ' + err)
                msg.channel.send("An error occurred.");
            } else {
                msg.channel.send(stdout);
            }
        });
    },
    uptime: function(msg) {
        exec('uptime', (err, stdout, stderr) => {
            if (err !== null) {
                console.log('exec error: ' + err)
                msg.channel.send("An error occurred.");
            } else {
                msg.channel.send("Server uptime is " + stdout);
            }
        });
    },
    notAnAdmin: function(msg) {
        msg.channel.send("You are not an admin!");
    },
    admin: function(msg) {
        if (isAdmin(msg.author.id)) {
            msg.channel.send("You are an admin!")
        } else {
            msg.channel.send("You are not an admin.")
        }
    },
    hello: function(msg) {
        let options = [
            "Hello!",
            "What's good?",
            "How u livin'?",
            "how u doin ( ͡° ͜ʖ ͡°)",
            "How's your day going?",
            "Good morrow laddy",
            "ayyyyyy"
        ]
        var random = Math.floor(Math.random() * (options.length));
        
        msg.channel.send(options[random]);
    },
    notACommand: function(msg) {
        msg.channel.send("That is not a command. Please use !help for a list of available commands.")
    },
    restart: function(msg) {
        if (isAdmin(msg.author.id)) {
            exec('sh scripts/restart_server.sh', (err, stdout, stderr) => {
                if (err !== null) {
                    console.log('exec error: ' + err)
                    msg.channel.send("An error occurred.");
                } else {
                    msg.channel.send("Restarting server (this will also restart this bot). Please wait up to three minutes to try again.");
                }
            });
        } else {
            this.notAnAdmin();
        }
    },
    restartMC: function(msg) {
        if (isAdmin(msg.author.id)) {
            exec('sh scripts/restart_mc.sh', (err, stdout, stderr) => {
                if (err !== null) {
                    console.log('exec error: ' + err)
                    msg.channel.send("An error occurred.");
                } else {
                    msg.channel.send("Restarting minecraft service...");
                }
            });
        } else {
            msg.channel.send("You are not an admin, therefore you are not the pogchamp.")
        }
    },
    help: function(msg) {
        msg.channel.send("The following commands are available:\n!status\n!uptime\n!admin\n!8ball\n!help");
        if(isAdmin(msg.author.id)) {
            msg.channel.send("Since you're an admin, you can also use:\n!restart\n!restart-mc")
        }
    },
    eightball: function(msg) {
        let options = [
            "Yes",
            "No",
            "Maybe",
            "Try again",
            "I don't know",
            "POGGERS",
            "Stfu!",
            "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        ]
        var random = Math.floor(Math.random() * (options.length));
        
        msg.channel.send(options[random]);
    },
    // tobiasQuote: function(msg) {
    //     let options = [
    //         "nothin yet hold up"
    //     ]
    //     var random = Math.floor(Math.random() * (options.length));
        
    //     msg.channel.send(options[random]);
    // }
}

let commands = new Map();
commands.set("status", cmd.status);
commands.set("restart", cmd.restart);
commands.set("uptime", cmd.uptime);
commands.set("restart-mc", cmd.restartMC);
commands.set("admin", cmd.admin)
commands.set("help", cmd.help);
commands.set("8ball", cmd.eightball);
commands.set("hello", cmd.hello);

module.exports.commands = commands;
module.exports.cmd = cmd;