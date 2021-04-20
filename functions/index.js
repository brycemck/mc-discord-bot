const { exec } = require('child_process');

let cmd = {
    status: function(msg) {
        exec('service minecraft status', (err, stdout, stderr) => {
            console.log(stdout);
            if (err !== null) {
                console.log('exec error: ' + err)
            }
        });
        msg.channel.send(stdout)
    }
}

let commands = new Map();
commands.set("status", cmd.status);

module.exports.cmd = cmd;
module.exports.commands = commands;