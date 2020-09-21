const Discord = require("discord.js");
const client = new Discord.Client();
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async (message) => {
  const bannedWords = process.env.BANNED_WORDS.split(",").map((word) =>
    word.toLocaleLowerCase().trim()
  );

  const restrictedUsers = process.env.RESTRICTED_USERS.split(",").map((user) =>
    user.toLocaleLowerCase().trim()
  );
  // If the author is not restricted abort.
  if (!restrictedUsers.includes(message.author.username.toLocaleLowerCase())) {
    return;
  }

  // Check if the message contains any banned words
  // if so delete it.
  for (const word of bannedWords) {
    if (message.content.toLowerCase().includes(word)) {
      await message.delete();
      break;
    }
  }
});

client.login(process.env.DISCORD_API_KEY);
