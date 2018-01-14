const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
client.user.setPresence({ game: { name: '*help for Commands ', type: 0} });  
  console.log('I am ready!');
});

const prefix = "*";

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find('name', 'divison-general');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to the server and have a good stay :wink: , ${member}`);

  member.addRole(member.guild.roles.find("name", "PLAYER/JOUEUR"))
});

client.on('message', message => {
  if(message.author.bot) return;  
  if(!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

  if (command === "add") {
    let numArray = args.map(n=> parseInt(n));
    let total = numArray.reduce( (p, c) => p+c);
    
    message.reply(total);
  }
  
  if (command === "say") {
    let modRole = message.guild.roles.find("name", "ADMIN");
    if(message.member.roles.has(modRole.id)) {
    message.channel.send(args.join(" "));
  } else {
    message.reply("Sorry you do not have the requirements to use the command.")
   }
  }

  if (command === "kick") {
    let modRole = message.guild.roles.find("name", "ADMIN");
    if(!message.member.roles.has(modRole.id)) {
      return message.reply("Sorry you do not have the requirements to use the command.");
    }
    if(message.mentions.users.size === 0) {
      return message.reply("Please mention a user to kick.")      
    }
    let kickMember = message.guild.member(message.mentions.users.first())
    if(!kickMember) {
      return message.reply("That user does not seem to exist :confused: ")
    }
    if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
      return message.reply("I dont have the permissions (KICK_MEMBER) to do this.");
    }
    kickMember.kick().then(member => {
      message.reply(`${member.user.username} was successfuly kicked. `);

  });  
  
  if (command == "help") {

    const embed = new Discord.RichEmbed()
    .setTitle("My commands")
    .setAuthor("L00PY", "https://cdn.discordapp.com/attachments/375966965958705162/401987260087533569/LIT2.png")
    /*
     * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
     */
    .setColor(0x00AE86)
    .setDescription("Check below for my commands :arrow_down: ")
    .setFooter("Dveloped by L00PY", "https://cdn.discordapp.com/attachments/375966965958705162/401987260087533569/LIT2.png")
    /*
     * Takes a Date object, defaults to current date.
     */
    .setTimestamp()
    .addField(" ```\*jean```",
      " ```\*kick```", "The bot will kick any user(you need to be admin).")
    /*
     * Inline fields may not display as inline if the thumbnail and/or image is too big.
     */
    .addField(" ```\*add```", "a simple calculator command.", true)
    /*
     * Blank field, useful to create some space.
     */
    .addBlankField(true)
    .addField(" ```\*say```", "The bot will say what you would like(you need to be admin).", true);

    message.channel.send({embed});
    
}

});

client.login(process.env.BOT_TOKEN);
