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

  
  if (command === "ping") {
    message.reply('pong!');
  } else

  if (command === "jean") {
    message.reply('stupid');
  }
  
  if (command == "help") {

		message.reply("I have sent you my commands privatly")

		message.author.send("Commands List: ",

		"!ping - bot will respond with pong")
  }

});

client.login(process.env.BOT_TOKEN);