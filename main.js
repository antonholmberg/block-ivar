const Discord = require("discord.js");
const client = new Discord.Client();
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

function shouldFilter(message) {
  const bannedWords = process.env.BANNED_WORDS.split(",").map((word) =>
    word.toLocaleLowerCase().trim()
  );

  for (const word of bannedWords) {
    if (message.content.toLowerCase().includes(word)) {
      return true;
    }
  }

  for (embed of message.embeds) {
    for (const word of bannedWords) {
      console.log(`title: ${embed.title}, description: ${embed.description}`);
      if (
        embed.title.toLocaleLowerCase().includes(word) ||
        embed.description.toLocaleLowerCase().includes(word)
      ) {
        return true;
      }
    }
  }

  return false;
}

client.on("message", async (message) => {
  const restrictedUsers = process.env.RESTRICTED_USERS.split(",").map((user) =>
    user.toLocaleLowerCase().trim()
  );
  // If the author is not restricted abort.
  if (!restrictedUsers.includes(message.author.username.toLocaleLowerCase())) {
    return;
  }

  // Check if the message contains any banned words
  // if so delete it.
  if (shouldFilter(message)) {
    await message.delete();
  }
});

client.login(process.env.DISCORD_API_KEY);
