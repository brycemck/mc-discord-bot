const { exec } = require('child_process');

let admins = [ // ids of users
  "635323524713807914",
  "817088476968517674",
  "464867699349258240"
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
        
        msg.channel.send(options[Math.floor(Math.random() * (options.length))]);
    },
    notACommand: function(msg) {
        msg.channel.send("That is not a command. Please use !help for a list of available commands.")
    },
    help: function(msg) {
        msg.channel.send("The following commands are available:\n!status\n!uptime\n!admin\n!8ball\n!memegen\n!help");
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
        ]
        
        msg.channel.send(options[Math.floor(Math.random() * (options.length))]);
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
            "When a man needs to prove to a woman that he's actually...",
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
        
        msg.channel.send(options[Math.floor(Math.random() * (options.length))]);
    },
    memegen: function(msg) {
        const memehelp = `
Memegen accepts parameters as individual strings, wrapped in double quotes and separated by a space.
        
The first parameter is always a description of the meme background you want to use. Spaces must be dashes in this string.
        
Each additional string argument is used as a new text field for the meme.
        
FLAGS:
  \"|gif\" - requests a gif version of your meme.
  \"\\link-to-image.jpg\" - if your meme background supports it, this will overlay the image you provide to the designated spot.
  
EXAMPLES:
  !memegen "pigeon" "me" " " "is this breakfast?" "\\https://www.clipartmax.com/png/middle/287-2876558_frappuccino-blog-starbucks.png"
  !memegen "fine" "_" "this is fine" "|gif"
  !memegen "gb" "who" "whom" "whom'st" "whomst'd"
`
        let arguments = msg.content.replace(/!memegen /g,'').replace(/[\u201C\u201D]/g, '"').split('" "');

        if (arguments.length < 3) {
            msg.channel.send(memehelp);
        } else {
            const baseUrl = "https://api.memegen.link/images";
            var requestOptions = "";
            var style = "";
            var fileformat = "jpg";

            for (const i in arguments) {
                if (arguments[i].includes("|")) {
                    fileformat = arguments[i].replace(/\|/g, '').replace(/"/g, '');
                    console.log(fileformat);
                    arguments.splice(i, 1);
                } else if (arguments[i].includes("\\")) {
                    style = arguments[i].replace(/\\/g, '').replace(/"/g, '');
                    arguments.splice(i, 1);
                } else {
                    arguments[i] = arguments[i].replace(/ /g, '_').replace(/"/g, '').replace(/\?/g, '~q').replace(/&/g, '~a').replace(/%/g, '~p').replace(/\//g, '~s').replace(/#/g, '~h');
                    requestOptions += "/" + arguments[i];
                }
            }
            console.log(arguments);
            var requestUrl = baseUrl + requestOptions + "." + fileformat;

            if (style != "") {
                console.log(style)
                requestUrl += "?style=" + style;
            }
            msg.channel.send(requestUrl);
        }
    }
}

let commands = new Map();
commands.set("status", cmd.status);
commands.set("uptime", cmd.uptime);
commands.set("admin", cmd.admin)
commands.set("help", cmd.help);
commands.set("8ball", cmd.eightball);
commands.set("hello", cmd.hello);
commands.set("memegen", cmd.memegen);

module.exports.commands = commands;
module.exports.cmd = cmd;