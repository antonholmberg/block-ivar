const Discord = require("discord.js");
const client = new Discord.Client();
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const bannedWords = [
  "covid",
  "corona",
  "chinese government",
  "the virus",
  "sars cov 2",
].map((word) => word.toLocaleLowerCase());

const restrictedUsers = ["skomakare"];

client.on("message", (message) => {
  // If the author is not restricted abort.
  if (!restrictedUsers.includes(message.author.username)) {
    return;
  }

  // Check if the message contains any banned words
  // if so delete it.
  for (word in bannedWords) {
    if (message.content.toLowerCase().includes(word)) {
      message.delete();
      break;
    }
  }
});

client.login(process.env.DISCORD_API_KEY);
