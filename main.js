const Discord = require("discord.js");
const client = new Discord.Client();
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

function shouldFilter(message) {
  const bannedWords = process.env.BANNED_WORDS.split(",").map((word) =>
    word.toLowerCase().trim()
  );

  for (const word of bannedWords) {
    if (message.content.toLowerCase().includes(word)) {
      return true;
    }
  }

  for (embed of message.embeds) {
    for (const word of bannedWords) {
      if (
        embed.title.toLowerCase().includes(word) ||
        embed.description.toLowerCase().includes(word)
      ) {
        return true;
      }
    }
  }

  return false;
}

async function handleMessage(message) {
  const restrictedUsers = process.env.RESTRICTED_USERS.split(",").map((user) =>
    user.toLowerCase().trim()
  );
  // If the author is not restricted abort.
  if (!restrictedUsers.includes(message.author.username.toLowerCase())) {
    return;
  }

  // Check if the message contains any banned words
  // if so delete it.
  if (shouldFilter(message)) {
    await message.delete();
  }
}

client.on("message", handleMessage);
client.on("messageUpdate", (_oldMessage, newMessage) =>
  handleMessage(newMessage)
);

client.login(process.env.DISCORD_API_KEY);
