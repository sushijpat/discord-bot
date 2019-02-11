var Discord = require('discord.js');
var cmd = require('./commands.js');
var auth = require('./auth.json');

console.log('starting!');

var bot = new Discord.Client();

bot.on('voiceStateUpdate', (oldMember, newMember) => {
  if (newMember.voiceChannel) {
    cmd.playFile(newMember, 'sup');
  }
});

bot.on('ready', function () {
  console.log('Logged in as %s', bot.user.username);
});

bot.on('message', msg => {

  let content = msg.content;

  if (content.substring(0, 1) == '!') {
    let args = content.substring(1).split(' ');
    let req = args[0];

    console.log(msg.member.user.username + ' - ' + req);

    args.splice(0, 1);
    switch (req) {

      case 'echo':
        msg.reply(args.join(' '));
        break;

      case 'play':
        cmd.playSound(msg, args);
        break;

      case 'join':
        cmd.join(msg);
        break;

      case 'leave':
        cmd.leave(msg);
        break;

      default:
        msg.reply(':angry: Unrecognized command!');

    }
  }

});

bot.login(auth.token);