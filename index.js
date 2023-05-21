// Require the necessary discord.js classes
import fs from "node:fs";
import path from "node:path";
import { Client, Collection, Events, GatewayIntentBits } from "discord.js";
import { fileURLToPath } from "url";
import { createRequire } from "module";
const require = createRequire(import.meta.url); // construct the require method
const configure = require("./config.json");

// region: set up the dir variable
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
//

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // Set a new item in the Collection with the key as the command name and the value as the exported module
  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
    );
  }
}

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Log in to Discord with your client's token
client.login(configure.token);

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
});

/* require("dotenv").config();
const tokenConfig = require("./config.json");
const { Client, IntentsBitField } = require("discord.js");
const Discord = require("discord.js");

const myIntents = new IntentsBitField();
myIntents.add(
  IntentsBitField.Flags.DirectMessages,
  IntentsBitField.Flags.MessageContent
);

const client = new Discord.Client({ intents: myIntents });

function changeTimeZone(date, timeZone) {
  if (typeof date === "string") {
    return new Date(
      new Date(date).toLocaleString("en-US", {
        timeZone,
      })
    );
  }

  return new Date(
    date.toLocaleString("en-US", {
      timeZone,
    })
  );
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
client.on("message", (msg) => {
  //if (msg.content === "ping") {
  msg.reply(changeTimeZone(new Date(), "America/New_York").toString());
  //}
});
client.login(tokenConfig.token); //
 */
