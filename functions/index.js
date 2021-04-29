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
    tobiasQuote: function(msg) {
        let options = [
            "Ah, the clumsy adolescence. It's a phase we've all been through. Except for me. I was like a cat.",
            "I'm afraid i just blue myself.",
            "Okay, lindsay, are you forgetting that i was a professional twice-over? An analyst and a therapist. An analrapist.",
            "Oh, mercy me! I keep forgetting i'm in the colonies!",
            "Oh boy, i got some looks on the bus cause of this!",
            "Excuse me, do these effectively hide my thunder?",
            "I'm afraid it's merely a cloaking agent from a sadly blunderous afternoon.",
            "When a man needs to prove to a woman that he's actually… ",
            "With fully formed libidos, not two young men playing grab-ass in the shower.",
            "Even if I have to take a chubby, I'm willing to suck it up!",
            "I had no idea a ninety year-old man could cave in my chest cavity like that.",
            "Well excuse me for liking the way they shape my junk.",
            "I realized it was for being a leading man. Oh, I can just taste those meaty leading man parts in my mouth!",
            "I will be a bigger and hairier mole than the one on your inner left thigh!",
            "Oh, I've a list of men that could fill every opening you have.",
            "I just found out that my cellular telephone was a lemon. It didn't work.",
            "Michael, you are quite the cupid. You can stick an arrow in my buttocks any time.",
            "Okay, Lindsay, are you forgetting that I was a professional twice over – an analyst and a therapist. The world's first analrapist.",
            "You know, first of all, we are doing this for her, because neither one of us wants to get divorced. And second-of-ly, I know you're the big marriage expert – oh, I'm sorry, I forgot, your wife is dead!",
            "Ooh, I can taste those meaty, leading man parts in my mouth!",
            "Come on. Let's see some bananas and nuts. Oh, perhaps we should just pull their pants off."
        ]
        var random = Math.floor(Math.random() * (options.length));
        
        msg.channel.send(options[random]);
    }
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