// Require the necessary discord.js classes
import fs from "node:fs";
import path from "node:path";
import {Client, Collection, Events, GatewayIntentBits} from "discord.js";
import {createRequire} from "module";

const require = createRequire(import.meta.url); // construct the require method
const configure = require("./config.json");
const relativePosix = require("./relativePosixPath.cjs");
const commandLoader = require("./commandLoader.cjs");

const client = new Client({intents: [GatewayIntentBits.Guilds]});

client.commands = new Collection();
const foldersPath = path.join(process.cwd(), "commands");
const commandFolders = fs.readdirSync(foldersPath);
const loader = new commandLoader();

const commandsToLoad = loader.loadFromCommandsFolder();
// for (const command of commandsToLoad) {

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs
        .readdirSync(commandsPath)
        .filter((file) => file.endsWith(".cjs"));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const posixFormattedRelativePath =
            relativePosix.getPosixRelativePath(filePath);
        const command = require(posixFormattedRelativePath);
        if ("data" in command.commandEST && "execute" in command.commandEST) {
            client.commands.set(command.commandEST.data.name, command.commandEST);
        } else {
            console.log(
                `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
            );
        }
    }
}
11
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


process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});

// client.on(Events.InteractionCreate, async (interaction) => {
//   if (!interaction.isChatInputCommand()) return;

//   if (interaction.commandName === "ping") {
//     const modal = new ModalBuilder()
//       .setCustomId("myModal")
//       .setTitle("My Modal");

//     // TODO: Add components to modal...
//   }
// });
