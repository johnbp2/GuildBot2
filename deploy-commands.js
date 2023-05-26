import { REST, Routes } from "discord.js";
import * as fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";
const require = createRequire(import.meta.url); // construct the require method
const url = require("url");
const conFigure = require("./config.json");
// const * as fs = import("node:fs");

// region: set up the dir variable
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
//

const commands = [];
// Grab all the command files from the commands directory you created earlier
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);
for (const folder of commandFolders) {
  // Grab all the command files from the commands directory you created earlier
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter(
      (file) =>
        file.endsWith(".cjs") || file.endsWith(".js") || file.endsWith(".mjs")
    );
  // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
  for (const file of commandFiles) {
    let filePath = path.join(commandsPath, file);

    var relativePath = path.relative(process.cwd(), filePath);
    console.log("Relative path ".concat(relativePath));

    let definitelyPosix = relativePath.split(path.sep).join(path.posix.sep);
    console.log("Posix Relative path ".concat(definitelyPosix));
    definitelyPosix = "./".concat(definitelyPosix);
    console.log("Posix Relative path ".concat(definitelyPosix));
    // TODO: figure out how to handle the relative path nstuff dynamically
    //  const myModule = require("./commands/easternTime/easternTime.cjs");

    const myModule = require(definitelyPosix);

    console.log("we got here");
    if ("data" in myModule.commandEST && "execute" in myModule.commandEST) {
      commands.push(myModule.commandEST.data.toJSON());
    } else {
      console.log(
        `[WARNING] The command at ${newFielPath} is missing a required "data" or "execute" property.`
      );
    }
    const rest = new REST().setToken(conFigure.token);

    // and deploy your commands!
    (async () => {
      try {
        console.log(
          `Started refreshing ${commands.length} application (/) commands.`
        );

        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
          Routes.applicationGuildCommands(
            conFigure.clientId,
            conFigure.guildId
          ),
          { body: commands }
        );

        console.log(
          `Successfully reloaded ${data.length} application (/) commands.`
        );
      } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
      }
    })();
  }
}
