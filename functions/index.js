const { exec } = require('child_process');

let cmd = {
    status: function(msg) {
        msg.channel.send('status check!')
        exec('echo "hi what is up my dude"', (err, stdout, stderr) => {
            console.log(stdout);
            if (err !== null) {
                console.log('exec error: ' + err)
            }
        });
    }
}

let commands = new Map();
commands.set("status", cmd.status);

module.exports.cmd = cmd;
module.exports.commands = commands;