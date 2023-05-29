import {REST, Routes} from "discord.js";
import * as fs from 'fs';
import path from 'path';
import {createRequire} from "module";

const require = createRequire(import.meta.url); // construct the require method
const url = require("url");
const conFigure = require("./config.json");
const relativePath = require("./relativePosixPath.cjs");

const commands = [];
// Grab all the command files from the commands directory you created earlier
const foldersPath = path.join(process.cwd(), "commands");
const commandFolders = fs.readdirSync(foldersPath);
for (const folder of commandFolders) {
    // Grab all the command files from the commands directory you created earlier
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs
        .readdirSync(commandsPath)
        .filter((file) => file.endsWith(".cjs") || file.endsWith(".js"));
    // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
    for (const file of commandFiles) {
        let absoluteFilePath = path.join(commandsPath, file);

        /*********************save*****************************
         const myModule = require("./commands/easternTime/easternTime.cjs");

         ******************************************************/
        const definitelyPosix = relativePath.getPosixRelativePath(absoluteFilePath);
        const myModule = require(definitelyPosix);

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
                    {body: commands}
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
