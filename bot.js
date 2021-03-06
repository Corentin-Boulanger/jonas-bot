const Discord = require('discord.js');
const config = require('./config.json');
const bot = new Discord.Client();

bot.on('ready', function () {
  console.log("Je suis connecté !");
  bot.user.setActivity('Burger King');
});

bot.login(config.token);

/*
 * A simple answer to 'ping'
 */
bot.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

/*
 * Retrieve the user's avatar
 */
bot.on('message', message => {
  // If the message is "what is my avatar"
  if (message.content === '!avatar') {
    // Send the user's avatar URL
    message.reply(message.author.avatarURL);
  }
});

/*
 * Command to set a player's role
 */
bot.on('message', msg => {
	if ((msg.content.startsWith('!jonas') || msg.content.startsWith('!second') || msg.content.startsWith('!joueur'))) {
    if (msg.member.roles.find(val => val.name === 'Gérant')) {

      // set player's role
      setPlayerRole(msg);
    }
    
    else {

      // prohibit members to set roles
      msg.reply("tu n'es pas le gérant du serveur, désolé :frowning:");
    }
	}
});

/*
 * Command to roll a dice between 1 and 100
 */
bot.on('message', msg => {
  if (msg.content === '!roll') {
    msg.channel.send(msg.author + ' rolled ' + (Math.floor(Math.random() * 100) + 1));
  }
});

/*
 * Set the role of a player to 'Jonas', '2eme mondial' ou 'Joueur'.
 * @param msg the message containing the command
 */
function setPlayerRole(msg) {

    // finding guildmember by nickname
    var args = msg.content.trim().split(/ +/g);
    var command = args[0];
    var memberName = args[1];
    var members = msg.guild.members;
    var guildMember = members.find(val => (memberName === val.nickname || memberName === val.user.username));

    if (guildMember) {

      // creating new members' roles array
      var roles = new Array();
      switch(command) {
        case('!jonas') :
          var newRole = guildMember.guild.roles.find(val => val.name === 'Jonas');  
          roles.push(newRole.id);
          break;
        
        case('!second') : 
          var newRole = guildMember.guild.roles.find(val => val.name === '2ème mondial');  
          roles.push(newRole.id);
          break;

        case('!joueur') : 
          var newRole = guildMember.guild.roles.find(val => val.name === 'Joueur');  
          roles.push(newRole.id);
          break;

        default :
          break;
      }

      // if guildmember is the admin, push admin role into roles array
      if (guildMember.roles.find(val => val.name === 'Gérant')) {
        roles.push('478205221827248129');
      }

      // set role
      guildMember.setRoles(roles).then(console.log).catch(console.error);
    }

    else {

      // if the player doesn't not exist, warn the user
      msg.reply("ce joueur n'existe pas :dizzy_face:");
    }
}